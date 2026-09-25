/* vault-build.mjs — 旅の記録と写真を暗号化して vault/ に出力する
 * 使い方: node scripts/vault-build.mjs
 *   合言葉: 参考資料/vault-password.txt（1行。gitignore 対象）
 *   ソルト: 参考資料/vault-salt.txt（無ければ作る。変えると全端末で再入力になる）
 *   記録:   Drive の 旅の記録/*.md（JOURNAL_DIR で上書き可）
 *   写真:   photomap_data.json（PHOTO_JSON で指定。n,t,lat,lng,p,img(300px),big(720px) の配列）
 * 出力: vault/manifest.json（公開してよい情報だけ）、journal.<hash>.enc、photos-MMDD.<hash>.enc
 *   .enc = 12 byte IV + AES-GCM 暗号文。鍵は PBKDF2-SHA256(210,000 回) で合言葉から導出。
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash, randomBytes } from 'crypto';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const refDir = join(root, '参考資料');
const outDir = join(root, 'vault');
const JOURNAL_DIR = process.env.JOURNAL_DIR || 'C:\\Users\\kanedomi\\マイドライブ\\Claude成果物\\travel-itinerary\\旅の記録';
const PHOTO_JSON = process.env.PHOTO_JSON || (existsSync(join(refDir, 'photomap_vault.json')) ? join(refDir, 'photomap_vault.json') : '');
const ITER = 210000;
const subtle = globalThis.crypto.subtle;

const pw = readFileSync(join(refDir, 'vault-password.txt'), 'utf8').trim();
if (!pw) throw new Error('合言葉が空です');
const saltPath = join(refDir, 'vault-salt.txt');
if (!existsSync(saltPath)) writeFileSync(saltPath, randomBytes(16).toString('base64') + '\n');
const salt = Buffer.from(readFileSync(saltPath, 'utf8').trim(), 'base64');

const baseKey = await subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
const key = await subtle.deriveKey({ name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' }, baseKey,
  { name: 'AES-GCM', length: 256 }, false, ['encrypt']);

async function encrypt(bytes) {
  const iv = randomBytes(12);
  const ct = new Uint8Array(await subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes));
  const out = new Uint8Array(12 + ct.length); out.set(iv, 0); out.set(ct, 12);
  return out;
}
const hash8 = (u8) => createHash('sha256').update(u8).digest('hex').slice(0, 8);

mkdirSync(outDir, { recursive: true });
for (const f of readdirSync(outDir)) if (f.endsWith('.enc')) unlinkSync(join(outDir, f));

const parts = [];
/* 記録 */
const mdFiles = readdirSync(JOURNAL_DIR).filter(f => f.endsWith('.md')).sort();
const journal = { files: mdFiles.map(f => ({ name: f, md: readFileSync(join(JOURNAL_DIR, f), 'utf8') })) };
{
  const enc = await encrypt(new TextEncoder().encode(JSON.stringify(journal)));
  const file = 'journal.' + hash8(enc) + '.enc';
  writeFileSync(join(outDir, file), enc);
  parts.push({ id: 'journal', file, bytes: enc.length, count: mdFiles.length, label: '旅の記録' });
}
/* 写真（日ごとの一覧＝300px サムネイル入り JSON と、1 枚ずつの 720px JPEG） */
const index = {}, photos = {};
const pDir = join(outDir, 'p');
mkdirSync(pDir, { recursive: true });
for (const f of readdirSync(pDir)) if (f.endsWith('.enc')) unlinkSync(join(pDir, f));
if (PHOTO_JSON) {
  const recs = JSON.parse(readFileSync(PHOTO_JSON, 'utf8'));
  const byDay = {};
  for (const r of recs) {
    const day = r.t.slice(0, 5); // MM/DD
    (byDay[day] = byDay[day] || []).push(r);
    index[r.n] = day.replace('/', '');
    if (r.big) {
      const m = /^data:image\/jpeg;base64,(.+)$/.exec(r.big);
      if (m) {
        const enc = await encrypt(Buffer.from(m[1], 'base64'));
        const file = r.n + '.' + hash8(enc) + '.enc';
        writeFileSync(join(pDir, file), enc);
        photos[r.n] = file;
      }
    }
  }
  let big = 0;
  for (const day of Object.keys(byDay).sort()) {
    const items = byDay[day].sort((a, b) => a.t.localeCompare(b.t) || a.n.localeCompare(b.n))
      .map(r => { const o = Object.assign({}, r); delete o.big; return o; });
    const enc = await encrypt(new TextEncoder().encode(JSON.stringify({ day, items })));
    const id = 'photos-' + day.replace('/', '');
    const file = id + '.' + hash8(enc) + '.enc';
    writeFileSync(join(outDir, file), enc);
    parts.push({ id, file, bytes: enc.length, count: items.length, label: day });
  }
  for (const f of readdirSync(pDir)) big += (readFileSync(join(pDir, f))).length;
  console.log('photos/p:', Object.keys(photos).length, 'files', (big / 1e6).toFixed(1) + 'MB');
}
/* 合言葉の検算用（既知平文）。中身が読めれば鍵が正しい */
const chk = await encrypt(new TextEncoder().encode('tabi-techo-vault'));
const manifest = {
  v: 1, built: new Date().toISOString(),
  kdf: { salt: salt.toString('base64'), iter: ITER, hash: 'SHA-256' },
  check: { iv: Buffer.from(chk.slice(0, 12)).toString('base64'), ct: Buffer.from(chk.slice(12)).toString('base64') },
  parts, index, photos
};
writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(manifest));
console.log('vault:', parts.map(p => `${p.id} ${(p.bytes / 1e6).toFixed(2)}MB (${p.count})`).join(', '));
