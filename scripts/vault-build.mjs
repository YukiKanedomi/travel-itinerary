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

/* IV は内容から決める（同じ内容→同じ暗号文→同じファイル名）。作り直しても変わらない写真は
 * 端末のキャッシュがそのまま効く。同じ鍵で同じ平文が同じ暗号文になるだけで、秘密は増えない */
async function encrypt(bytes) {
  const iv = createHash('sha256').update(salt).update(bytes).digest().subarray(0, 12);
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
let ptype = 'image/jpeg';
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
      const m = /^data:(image\/(?:jpeg|avif));base64,(.+)$/.exec(r.big);
      if (m) {
        ptype = m[1];
        const enc = await encrypt(Buffer.from(m[2], 'base64'));
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
  /* 全写真のピン（扉の地図用。小さいので 1 区画） */
  {
    const pins = recs.map(r => ({ n: r.n, d: r.t.slice(0, 5).replace('/', ''), t: r.t.slice(6), lat: +(+r.lat).toFixed(5), lng: +(+r.lng).toFixed(5), p: String(r.p || '').split(/[,，（(]/)[0] }));
    const enc = await encrypt(new TextEncoder().encode(JSON.stringify({ pins })));
    const file = 'pins.' + hash8(enc) + '.enc';
    writeFileSync(join(outDir, file), enc);
    parts.push({ id: 'pins', file, bytes: enc.length, count: pins.length, label: 'pins' });
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
  parts, index, photos, ptype
};
writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(manifest));
console.log('vault:', parts.map(p => `${p.id} ${(p.bytes / 1e6).toFixed(2)}MB (${p.count})`).join(', '));
