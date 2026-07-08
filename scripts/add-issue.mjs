/* add-issue.mjs — 南十字星新聞の号を articles.json に検証つきで追記する
 * 使い方: node scripts/add-issue.mjs <新しい号のJSONファイル>
 * 検証: 号番号の連番 / 日付・タイトルの重複禁止 / 必須フィールド / 本文分量 / 個人情報らしき文字列
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dbPath = join(root, 'articles.json');
const issuePath = process.argv[2];
if (!issuePath) { console.error('usage: node scripts/add-issue.mjs <issue.json>'); process.exit(1); }

const db = JSON.parse(readFileSync(dbPath, 'utf8'));
const issue = JSON.parse(readFileSync(issuePath, 'utf8'));
const errs = [];

/* 必須フィールド */
['no', 'date', 'wd', 'theme', 'title', 'lead', 'body', 'sources', 'memo'].forEach(k => {
  if (issue[k] === undefined || issue[k] === null || issue[k] === '') errs.push(`必須フィールド欠落: ${k}`);
});
/* 連番 */
if (issue.no !== db.meta.currentNo + 1) errs.push(`号番号が連番でない: ${issue.no}（期待 ${db.meta.currentNo + 1}）`);
/* 重複 */
if (db.issues.some(i => i.date === issue.date)) errs.push(`日付重複: ${issue.date}`);
if (db.issues.some(i => i.title === issue.title)) errs.push(`タイトル重複: ${issue.title}`);
/* 日付形式・曜日整合 */
if (!/^\d{4}-\d{2}-\d{2}$/.test(issue.date || '')) errs.push(`日付形式不正: ${issue.date}`);
else {
  const wd = ['日', '月', '火', '水', '木', '金', '土'][new Date(issue.date + 'T00:00:00').getDay()];
  if (wd !== issue.wd) errs.push(`曜日不一致: ${issue.date} は${wd}曜（記載 ${issue.wd}）`);
}
/* 分量（本文合計 800〜3000字） */
const len = (issue.body || []).reduce((a, b) => a + (b.p || '').replace(/<[^>]+>/g, '').length, 0);
if (len < 800) errs.push(`本文が短すぎる: ${len}字（最低800字）`);
if (len > 3000) errs.push(`本文が長すぎる: ${len}字（最大3000字）`);
/* 出典 */
if (!Array.isArray(issue.sources) || issue.sources.length < 1) errs.push('出典が1件もない');
(issue.sources || []).forEach(s => { if (!/^https?:\/\//.test(s.u || '')) errs.push(`出典URL不正: ${s.u}`); });
/* 写真（任意。載せるならクレジット必須＋ファイル実在） */
(issue.photos || []).forEach(p => {
  if (!p.credit) errs.push(`写真クレジット欠落: ${p.src}`);
  if (!/^assets\//.test(p.src || '')) errs.push(`写真パス不正: ${p.src}`);
  else try { readFileSync(join(root, p.src)); } catch { errs.push(`写真ファイルが存在しない: ${p.src}`); }
});
/* 個人情報らしき文字列の混入防止（予約番号等） */
const flat = JSON.stringify(issue);
['EDVEZZ', 'FXY1J8', 'F_054LYY', '783413573', '409441925', 'KANEDOMI'].forEach(ng => {
  if (flat.toUpperCase().includes(ng)) errs.push(`個人情報らしき文字列を検出: ${ng}`);
});

if (errs.length) { console.error('[REJECT]'); errs.forEach(e => console.error(' ✗ ' + e)); process.exit(1); }

db.issues.push(issue);
db.meta.currentNo = issue.no;
writeFileSync(dbPath, JSON.stringify(db, null, 2) + '\n', 'utf8');
console.log(`OK: 第${issue.no}号「${issue.title}」を追記（本文${len}字・出典${issue.sources.length}件）`);
