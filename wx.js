/* ============ wx.js — 天気の実況（Open-Meteo・APIキー不要） ============ */
/* 3地点×16日分の日別予報＋現在気温を1回の呼び出しで取得し、localStorage(wx_v1) に3時間保持する。
 * オフライン時や取得失敗時は前回分をそのまま出す。表示側は data-wx="地点|YYYY-MM-DD" を持つ要素を置くだけ。 */

var WX_LOC = {
  mel: { name:'メルボルン',   lat:-37.81, lon:144.96 },
  bm:  { name:'カトゥーンバ', lat:-33.71, lon:150.31 },
  syd: { name:'シドニー',     lat:-33.87, lon:151.21 }
};
var WX_KEYS = ['mel','bm','syd'];
/* DAYごとの滞在地（DAY1は日本・機中なので無し） */
var WX_DAY_LOC = { 2:'mel', 3:'mel', 4:'mel', 5:'bm', 6:'syd', 7:'syd' };
var WX_TTL = 3 * 60 * 60 * 1000;

function wxLabel(code) {
  if (code === 0) return '快晴';
  if (code === 1) return '晴れ';
  if (code === 2) return '晴れ時々曇り';
  if (code === 3) return '曇り';
  if (code === 45 || code === 48) return '霧';
  if (code >= 51 && code <= 57) return '霧雨';
  if (code >= 61 && code <= 67) return '雨';
  if (code >= 71 && code <= 77) return '雪';
  if (code >= 80 && code <= 82) return 'にわか雨';
  if (code >= 85 && code <= 86) return 'にわか雪';
  if (code >= 95) return '雷雨';
  return '—';
}
function wxCache() {
  try { return JSON.parse(localStorage.getItem('wx_v1') || 'null'); } catch(e) { return null; }
}
function wxDaily(loc, ymd) {
  var c = wxCache(); if (!c || !c.locs || !c.locs[loc]) return null;
  var d = c.locs[loc]; var i = d.dates.indexOf(ymd);
  if (i < 0) return null;
  return { max:Math.round(d.max[i]), min:Math.round(d.min[i]), pop:d.pop[i], code:d.code[i], label:wxLabel(d.code[i]) };
}
function wxDailyText(loc, ymd) {
  var w = wxDaily(loc, ymd); if (!w) return '';
  return w.label + ' ' + w.min + '–' + w.max + '℃' + (w.pop != null ? ' 雨' + w.pop + '%' : '');
}
function wxNowText(loc) {
  var c = wxCache(); if (!c || !c.locs || !c.locs[loc] || !c.locs[loc].now) return '';
  var n = c.locs[loc].now;
  return WX_LOC[loc].name + ' ' + wxLabel(n.code) + ' ' + Math.round(n.temp) + '℃';
}
function wxStamp() {
  var c = wxCache(); if (!c) return '';
  var t = new Date(c.ts);
  return ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);
}
/* 画面上の data-wx / data-wx-now / data-wx-foot を埋める（描画後と取得後に呼ぶ） */
function wxApply() {
  var els = document.querySelectorAll('[data-wx]');
  Array.prototype.forEach.call(els, function(el){
    var p = el.getAttribute('data-wx').split('|');
    var t = wxDailyText(p[0], p[1]);
    el.textContent = t || (wxCache() ? '予報はまだ先' : '—');
    el.classList.toggle('wx-none', !t);
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-wx-now]'), function(el){
    el.textContent = wxNowText(el.getAttribute('data-wx-now'));
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-wx-foot]'), function(el){
    var c = wxCache();
    el.textContent = c ? '16日先まで表示・更新 ' + wxStamp() + '（Open-Meteo）' : (navigator.onLine ? '予報を取得中…' : 'オフラインのため予報なし');
  });
}
function wxRefresh() {
  var c = wxCache();
  if (c && Date.now() - c.ts < WX_TTL) return;
  if (!navigator.onLine) return;
  var lat = WX_KEYS.map(function(k){ return WX_LOC[k].lat; }).join(',');
  var lon = WX_KEYS.map(function(k){ return WX_LOC[k].lon; }).join(',');
  var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
    '&current=temperature_2m,weather_code&timezone=Australia%2FSydney&forecast_days=16';
  fetch(url).then(function(r){ return r.json(); }).then(function(arr){
    if (!Array.isArray(arr)) arr = [arr];
    var out = { ts:Date.now(), locs:{} };
    arr.forEach(function(o, i){
      var k = WX_KEYS[i]; if (!k || !o.daily) return;
      out.locs[k] = { dates:o.daily.time, max:o.daily.temperature_2m_max, min:o.daily.temperature_2m_min,
        pop:o.daily.precipitation_probability_max, code:o.daily.weather_code,
        now: o.current ? { temp:o.current.temperature_2m, code:o.current.weather_code } : null };
    });
    try { localStorage.setItem('wx_v1', JSON.stringify(out)); } catch(e) {}
    wxApply();
  }).catch(function(){ wxApply(); });
}
