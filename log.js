/* ============ log.js — 記録タブ（旅の記録・写真は金庫から復号して表示） ============ */
var LOG = null, logOpen = null;

function logEsc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
/* 行内: **太字**、IMG_1234（〜1240・1241）→ 写真を開くボタン */
function logInline(s) {
  var h = logEsc(s).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  h = h.replace(/IMG_(\d{4})((?:[〜・、]\d{4})*)/g, function (m, first, rest) {
    var nums = [first].concat((rest.match(/\d{4}/g) || []));
    var out = [], seps = rest.replace(/\d{4}/g, '').split('');
    nums.forEach(function (n, i) { out.push((i ? seps[i - 1] || '・' : '') + '<button type="button" class="imgref" onclick="logPhoto(\'' + n + '\')">' + (i ? '' : 'IMG_') + n + '</button>'); });
    return out.join('');
  });
  return h;
}
/* 最小の Markdown → 手帳の紙面。見出し・箇条書き（2段）・表・罫線・段落だけ */
function logMd(md) {
  var lines = md.split(/\r?\n/), h = '', i = 0, inUl = 0, para = [], inTbl = false, tblRows = [];
  function flushP() { if (para.length) { h += '<p class="log-p">' + logInline(para.join(' ')) + '</p>'; para = []; } }
  function closeUl() { while (inUl) { h += '</ul>'; inUl--; } }
  function flushTbl() {
    if (!tblRows.length) return;
    var head = tblRows[0], body = tblRows.slice(1).filter(function (r) { return !/^[-:| ]+$/.test(r); });
    var cells = function (r) { return r.replace(/^\||\|$/g, '').split('|').map(function (c) { return c.trim(); }); };
    h += '<div class="log-tblwrap"><table class="log-tbl"><thead><tr>' + cells(head).map(function (c) { return '<th>' + logInline(c) + '</th>'; }).join('') + '</tr></thead><tbody>';
    body.forEach(function (r) { h += '<tr>' + cells(r).map(function (c) { return '<td>' + logInline(c) + '</td>'; }).join('') + '</tr>'; });
    h += '</tbody></table></div>'; tblRows = []; inTbl = false;
  }
  for (; i < lines.length; i++) {
    var l = lines[i];
    if (/^\|/.test(l)) { flushP(); closeUl(); inTbl = true; tblRows.push(l); continue; }
    if (inTbl) flushTbl();
    var m;
    if ((m = /^(#{1,3})\s+(.*)$/.exec(l))) {
      flushP(); closeUl();
      var lv = m[1].length, t = m[2];
      if (lv === 1) h += '<div class="log-title">' + logInline(t.replace(/^旅の記録\s*—\s*/, '')) + '</div>';
      else h += '<h' + (lv + 1) + ' class="log-h' + lv + '">' + logInline(t.replace(/^—\s*|\s*—$/g, '')) + '</h' + (lv + 1) + '>';
      continue;
    }
    if (/^---+\s*$/.test(l)) { flushP(); closeUl(); h += '<hr class="log-hr">'; continue; }
    if ((m = /^(\s*)[-*]\s+(.*)$/.exec(l))) {
      flushP();
      var depth = m[1].length >= 2 ? 2 : 1;
      while (inUl < depth) { h += '<ul class="log-ul">'; inUl++; }
      while (inUl > depth) { h += '</ul>'; inUl--; }
      h += '<li>' + logInline(m[2]) + '</li>'; continue;
    }
    if (!l.trim()) { flushP(); closeUl(); continue; }
    closeUl(); para.push(l.trim());
  }
  flushP(); closeUl(); flushTbl();
  return h;
}
function logFileMeta(f) {
  var m = /_(\d{4})(?:-(\d{4}))?_(.+)\.md$/.exec(f.name);
  var d1 = m ? m[1].slice(0, 2).replace(/^0/, '') + '/' + m[1].slice(2).replace(/^0/, '') : '';
  var d2 = m && m[2] ? m[2].slice(0, 2).replace(/^0/, '') + '/' + m[2].slice(2).replace(/^0/, '') : '';
  var t = (f.md.split('\n')[0] || '').replace(/^#\s*旅の記録\s*—\s*/, '').replace(/^#\s*/, '')
    .replace(/^\d{1,2}\/\d{1,2}（.）\s*/, '').replace(/（\d{4}-\d{2}-\d{2}〜\d{2}）\s*$/, '');
  return { date: d2 ? d1 + '〜' + d2 : d1, title: t, slug: m ? m[3] : f.name };
}
function renderLogPage() {
  var host = document.getElementById('pane-log'); if (!host) return;
  var head = '<div class="ch-head"><div class="ch-eyebrow">TRAVEL LOG</div><div class="ch-h1">旅の記録</div>' +
    '<div class="ch-sub">写真を見ながら書いた日ごとの記録と、写真の足跡。紙と雲の別の画面で開きます</div></div>';
  if (!LOG) {
    host.innerHTML = head + '<div class="stub-page"><div class="t1">金庫を開いています…</div><div class="t2">初回は少し時間がかかります</div></div>';
    Vault.load('journal').then(function (j) { LOG = j; renderLogPage(); }).catch(function (e) {
      host.innerHTML = head + '<div class="stub-page"><div class="t1">記録を開けませんでした</div><div class="t2">オンラインで開き直すか、合言葉を入れ直してください。<br><button class="lbtn" onclick="lockForget()">合言葉を入れ直す</button></div></div>';
    });
    return;
  }
  var h2 = head + '<div class="toc-list">';
  LOG.files.slice().sort(function (a, b) { return a.name < b.name ? -1 : 1; }).forEach(function (f) {
    var meta = logFileMeta(f), key = (/_(\d{4})/.exec(f.name) || [])[1] || '';
    h2 += '<a class="trow-idx log-row" href="footprints/log.html#' + key + '"><span class="n mono">' + logEsc(meta.date) + '</span>' +
      '<span class="b"><div class="tt">' + logEsc(meta.title) + '</div></span><span class="arw">›</span></a>';
  });
  h2 += '</div>';
  h2 += '<a class="log-fp" href="footprints/"><span class="fp-body"><span class="rc-k">PHOTO FOOTPRINTS</span><span class="rc-t">写真の足跡</span>' +
    '<span class="rc-d">撮った場所と時間で旅をたどる、写真の地図</span></span><span class="rc-c">›</span></a>';
  h2 += '<div class="hours-note">記録と写真は暗号化して保存しています。合言葉を知っている端末だけが開けます。</div>' +
    '<div class="pill-row"><button type="button" class="pill-btn" onclick="lockForget()">この端末の合言葉を忘れる</button></div>';
  host.innerHTML = h2;
}
function logOpenFile(i) { logOpen = i; renderLogPage(); window.scrollTo(0, 0); }
function logBack() { logOpen = null; renderLogPage(); window.scrollTo(0, 0); }
/* 写真を開く（金庫から該当の日の区画を読む） */
function logPhoto(n) {
  var lb = document.getElementById('lightbox'); if (!lb) return;
  var img = document.getElementById('lb-img'), cap = document.getElementById('lb-cap');
  img.removeAttribute('src'); cap.textContent = 'IMG_' + n + ' を開いています…'; lb.classList.add('on');
  Vault.photoURL(n).then(function (u) {
    if (!u) { cap.textContent = 'IMG_' + n + ' は金庫にありません'; return; }
    img.src = u; cap.textContent = 'IMG_' + n;
    return Vault.photo(n).then(function (p) { if (p) cap.textContent = 'IMG_' + p.n + '　' + p.t + '　' + (p.p || ''); });
  }).catch(function () { cap.textContent = '写真を開けませんでした'; });
}
function lbClose() { var lb = document.getElementById('lightbox'); if (lb) lb.classList.remove('on'); }
