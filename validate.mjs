/* v2 データ検証 — trip.js / map.js の整合を機械チェック
 * 使い方: node v2/validate.mjs  （リポジトリルートから）
 * チェック内容:
 *  1. 日付と曜日の一致（2026年カレンダーと照合）
 *  2. スケジュール時刻が昇順（HH:MM形式のもの）
 *  3. picks キーが PICKS に存在
 *  4. DAY5 に hard（時間厳守）が存在
 *  5. SPOT_HOURS のキーが SPOTS の name と一致
 *  6. 営業時間の書式と開始<終了
 *  7. フライト・ホテルの必須フィールド
 */
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import vm from 'vm';

const dir = dirname(fileURLToPath(import.meta.url));
const ctx = vm.createContext({ Intl, Date, console });
vm.runInContext(readFileSync(join(dir, 'trip.js'), 'utf8'), ctx);
vm.runInContext(readFileSync(join(dir, 'map.js'), 'utf8'), ctx);

const { TRIP, PICKS, SPOTS, SPOT_HOURS } = ctx;
const errors = [], warns = [];

/* 1. 日付・曜日 */
const wd = ['日','月','火','水','木','金','土'];
TRIP.days.forEach((d, i) => {
  const [m, day] = d.date.split('/').map(Number);
  const dt = new Date(2026, m - 1, day);
  const expect = new Date(2026, 8, 20 + i); // 9/20 起点で連続しているか
  if (dt.getTime() !== expect.getTime())
    errors.push(`DAY${d.n}: 日付 ${d.date} が連続していない（期待 ${expect.getMonth()+1}/${expect.getDate()}）`);
  if (wd[dt.getDay()] !== d.wd)
    errors.push(`DAY${d.n}: ${d.date} は${wd[dt.getDay()]}曜日（記載: ${d.wd}）`);
});

/* 2. 時刻昇順 */
TRIP.days.forEach(d => {
  let prev = -1, prevT = '';
  d.sched.forEach(r => {
    const m = /^(\d{1,2}):(\d{2})$/.exec(r.t);
    if (!m) return; // 「夜」等はスキップ
    const min = +m[1] * 60 + +m[2];
    if (min < prev) errors.push(`DAY${d.n}: ${r.t}「${r.h}」が直前の ${prevT} より早い`);
    prev = min; prevT = r.t;
  });
});

/* 3. picks キー */
TRIP.days.forEach(d => (d.picks || []).forEach(k => {
  if (!PICKS[k]) errors.push(`DAY${d.n}: picks '${k}' が PICKS に存在しない`);
}));

/* 4. DAY5 厳守 */
const d5 = TRIP.days[4];
if (!d5.sched.some(r => r.hard && r.t === '8:25'))
  errors.push('DAY5: 8:25 集合の hard（時間厳守）が見つからない（絶対ルール）');
if (!d5.voucher) warns.push('DAY5: ツアーバウチャーが未設定');

/* 5-6. SPOT_HOURS */
const names = new Set(SPOTS.map(s => s.name));
Object.keys(SPOT_HOURS).forEach(k => {
  if (!names.has(k)) warns.push(`SPOT_HOURS '${k}' に対応する SPOTS がない（バッジ非表示になる）`);
  const h = SPOT_HOURS[k];
  Object.keys(h).forEach(day => {
    if (day === 'note') return;
    const v = h[day];
    if (v === '24h') return;
    const m = /^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/.exec(v);
    if (!m) { errors.push(`SPOT_HOURS '${k}' [${day}]: 書式不正 '${v}'`); return; }
    if (+m[1] * 60 + +m[2] >= +m[3] * 60 + +m[4])
      errors.push(`SPOT_HOURS '${k}' [${day}]: 開始>=終了 '${v}'`);
  });
});
SPOTS.forEach(s => { if (!SPOT_HOURS[s.name] && !s.hot && s.area !== 'blue')
  warns.push(`SPOTS '${s.name}' に営業時間データなし（任意）`); });

/* 7. フライト・ホテル */
TRIP.flights.forEach(f => ['id','name','route','meta','cut'].forEach(k => {
  if (!f[k]) errors.push(`flight ${f.id || '?'}: ${k} が空`);
}));
TRIP.hotels.forEach(h => ['name','jp','addr','tel','stay'].forEach(k => {
  if (!h[k]) errors.push(`hotel ${h.jp || '?'}: ${k} が空`);
}));

/* 結果 */
console.log('=== v2 データ検証 ===');
console.log(`DAY数: ${TRIP.days.length} / スケジュール行: ${TRIP.days.reduce((a,d)=>a+d.sched.length,0)} / 付箋: ${Object.keys(PICKS).length} / スポット: ${SPOTS.length}`);
if (errors.length) { console.log('\n[ERROR]'); errors.forEach(e => console.log(' ✗ ' + e)); }
if (warns.length)  { console.log('\n[WARN]');  warns.forEach(w => console.log(' - ' + w)); }
if (!errors.length) console.log('\nOK: エラーなし' + (warns.length ? `（警告 ${warns.length} 件）` : ''));
process.exit(errors.length ? 1 : 0);
