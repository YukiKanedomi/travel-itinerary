/* fetch-press-image.mjs — Wikimedia Commons のサムネイル画像を assets/press/ に保存する
 * 使い方: node scripts/fetch-press-image.mjs <upload.wikimedia.orgのURL> <保存先 assets/press/N-1.jpg>
 * 安全策: ダウンロード元は upload.wikimedia.org のみ許可。保存先は assets/press/ 配下のみ。
 */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join, normalize } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const [url, out] = process.argv.slice(2);
if (!url || !out) { console.error('usage: node scripts/fetch-press-image.mjs <url> <assets/press/xx.jpg>'); process.exit(1); }

const u = new URL(url);
if (u.hostname !== 'upload.wikimedia.org') { console.error('REJECT: 許可されていないホスト ' + u.hostname); process.exit(1); }
const rel = normalize(out).replace(/\\/g, '/');
if (!rel.startsWith('assets/press/')) { console.error('REJECT: 保存先は assets/press/ 配下のみ'); process.exit(1); }

const dst = join(root, rel);
mkdirSync(dirname(dst), { recursive: true });
const res = await fetch(url, { headers: { 'User-Agent': 'TravelNotebookPress/1.0 (personal travel app; kanedomi918@gmail.com)' } });
if (!res.ok) { console.error('REJECT: HTTP ' + res.status); process.exit(1); }
const buf = Buffer.from(await res.arrayBuffer());
if (buf.length < 10000) { console.error('REJECT: ファイルが小さすぎる（' + buf.length + 'B）'); process.exit(1); }
if (buf.length > 600000) { console.error('REJECT: 600KB超（thumbの幅指定を下げて）'); process.exit(1); }
writeFileSync(dst, buf);
console.log('OK: ' + rel + ' (' + Math.round(buf.length / 1024) + 'KB)');
