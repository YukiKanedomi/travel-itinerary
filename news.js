/* ============ news.js — 雑誌タブ（南十字星・まいにちミニマガジン） ============ */
/* articles.json（自動配信が毎朝追記）を読み、手帳に挟まったミニ雑誌として描画する */

var NEWS = null;
var newsOpenNo = null; /* null = 最新号 */

var MG_CHIP = { 'ニュース':'t-news', 'スポット深掘り':'t-spot', '発掘・食':'t-spot', '発掘・体験':'t-spot',
  'スポット発掘':'t-spot', '実用':'t-use', '実用・買い物':'t-use', '週のまとめ':'t-week' };

function newsDaysLeft(dateStr) {
  var d = Math.ceil((new Date('2026-09-20T00:00:00+09:00') - new Date(dateStr + 'T06:00:00+09:00')) / 86400000);
  return d > 0 ? d : 0;
}
function mgPhotoHTML(p, alt) {
  return '<div class="mg-photo' + (alt ? ' alt' : '') + '"><img src="' + p.src + '" alt="" loading="lazy">' +
    '<div class="pc"><span class="cap">' + (p.cap || '') + '</span>' +
    (p.credit ? '<span class="credit">' + p.credit + '</span>' : '') + '</div></div>';
}
function mgSheetHTML(m, issue) {
  var left = newsDaysLeft(issue.date);
  var photos = issue.photos || [];
  var chip = MG_CHIP[issue.theme] || 't-spot';
  var h = '<div class="mg-sheet"><div class="tape"></div>';
  h += '<div class="mg-brand"><span class="mg-logo">' + m.paper + '</span><span class="en">' + m.en + '</span>' +
    '<span class="no">No.' + issue.no + '</span></div>';
  h += '<div class="mg-meta"><span class="mg-chip ' + chip + '">' + issue.theme + '</span>' +
    '<span class="mg-date">' + issue.date.replace(/-/g, '.') + ' ' + issue.wd + '</span>' +
    '<span class="mg-left">出発まで' + left + '日</span></div>';
  h += '<h2 class="mg-title">' + issue.title + '</h2>';
  h += '<p class="mg-lead">' + issue.lead + '</p>';
  if (photos[0]) h += mgPhotoHTML(photos[0], false);
  /* 本文（2枚目の写真があれば中盤に挟む） */
  h += '<div class="mg-body">';
  var paras = issue.body || [];
  var mid = photos[1] ? Math.ceil(paras.length / 2) : -1;
  paras.forEach(function(b, i) {
    if (b.h) h += '<div><span class="mg-h">' + b.h + '</span></div>';
    h += '<p class="mg-p">' + b.p + '</p>';
    if (i + 1 === mid) h += '</div>' + mgPhotoHTML(photos[1], true) + '<div class="mg-body">';
  });
  h += '</div>';
  /* 発掘スポット付箋（MAP付き） */
  if (issue.spots && issue.spots.length) {
    h += '<div class="mg-spots-t">きょうの発掘 — タップでマップ</div><div class="fusen-grid mg-spots">';
    issue.spots.forEach(function(s) {
      var g = (typeof GENRE !== 'undefined' && GENRE[s.g]) ? GENRE[s.g] : { cls: 'g-cafe' };
      h += '<a class="fusen ' + g.cls + '" href="' + s.map + '" target="_blank" rel="noopener">' +
        '<span class="tag">' + s.area + '</span><span class="go">MAP</span>' +
        '<div class="nm">' + s.name + '</div><div class="tp">' + s.tip + '</div></a>';
    });
    h += '</div>';
  }
  if (issue.sources && issue.sources.length) {
    h += '<div class="mg-src"><span class="l">参考</span>' +
      issue.sources.map(function(s) { return '<a href="' + s.u + '" target="_blank" rel="noopener">' + s.t + '</a>'; }).join('　') +
      '</div>';
  }
  if (issue.memo) h += '<div class="mg-memo"><span class="l">編集部より</span><p>' + issue.memo + '</p></div>';
  h += '<div class="mg-foot"><span>' + m.en + '</span><span>' + m.sub + '</span></div>';
  return h + '</div>';
}
function renderNewsPage() {
  var host = document.getElementById('pane-news');
  if (!host) return;
  if (!NEWS || !NEWS.issues || !NEWS.issues.length) {
    host.innerHTML = '<div class="ch-head"><div class="ch-eyebrow">DAILY MAG</div><div class="ch-h1">まいにち</div></div>' +
      '<div class="stub-page"><div class="t1">けさの号はまだ届いていません</div>' +
      '<div class="t2">毎朝6時台に自動で届きます。オフラインの時は前回取得した号が読めます。</div></div>';
    return;
  }
  var m = NEWS.meta;
  var issue = null;
  if (newsOpenNo !== null) NEWS.issues.forEach(function(i) { if (i.no === newsOpenNo) issue = i; });
  if (!issue) issue = NEWS.issues[NEWS.issues.length - 1];
  var h = mgSheetHTML(m, issue);
  if (NEWS.issues.length > 1) {
    h += '<div class="sec-h">— バックナンバー —</div><div class="np-back">';
    NEWS.issues.slice().reverse().forEach(function(i) {
      h += '<button class="np-back-row' + (i.no === issue.no ? ' on' : '') + '" onclick="openIssue(' + i.no + ')">' +
        '<span class="bn">No.' + i.no + '</span><span class="bd">' + i.date.slice(5).replace('-', '/') + '（' + i.wd + '）</span>' +
        '<span class="bt">' + i.title + '</span></button>';
    });
    h += '</div>';
  }
  h += '<div class="hours-note">毎朝6時台にPCが自動で取材・発行（曜日テーマ制・9/19最終号）。内容は参考リンクで確認を。写真はWikimedia Commons等のCCライセンス素材。</div>';
  host.innerHTML = h;
}
function openIssue(no) {
  newsOpenNo = no;
  renderNewsPage();
  window.scrollTo(0, 0);
}
/* 「いま」ページに今朝の号を差し込む */
function injectNowPress() {
  var host = document.getElementById('now-press');
  if (!host || !NEWS || !NEWS.issues || !NEWS.issues.length) return;
  var i = NEWS.issues[NEWS.issues.length - 1];
  host.innerHTML = '<button class="np-band" onclick="show(\'news\')">' +
    '<span class="np-band-l">けさの' + NEWS.meta.paper + '</span>' +
    '<span class="np-band-t">No.' + i.no + '｜' + i.title + '</span>' +
    '<span class="np-band-a">読む ›</span></button>';
}
function initNews() {
  fetch('articles.json', { cache: 'no-store' })
    .then(function(r) { return r.json(); })
    .then(function(d) { NEWS = d; renderNewsPage(); injectNowPress(); })
    .catch(function() { renderNewsPage(); });
}
