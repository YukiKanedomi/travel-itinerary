/* ============ docs.js — 書類ポケット（eチケット・バウチャー等をこの端末の中だけに保存） ============ */
/* 保存先は IndexedDB(tabi_docs_v1)。ネットには送らない。画像は長辺1800pxのJPEGに縮めて保存、PDFはそのまま。 */

var DC_DB = 'tabi_docs_v1', DC_STORE = 'docs';
var dcUrls = [];   /* 表示中の objectURL（再描画時に解放） */

function dcOpen() {
  return new Promise(function(res, rej){
    var r = indexedDB.open(DC_DB, 1);
    r.onupgradeneeded = function(){ r.result.createObjectStore(DC_STORE, { keyPath:'id' }); };
    r.onsuccess = function(){ res(r.result); };
    r.onerror = function(){ rej(r.error); };
  });
}
function dcAll() {
  return dcOpen().then(function(db){
    return new Promise(function(res, rej){
      var r = db.transaction(DC_STORE).objectStore(DC_STORE).getAll();
      r.onsuccess = function(){ res(r.result || []); };
      r.onerror = function(){ rej(r.error); };
    });
  });
}
function dcPut(doc) {
  return dcOpen().then(function(db){
    return new Promise(function(res, rej){
      var tx = db.transaction(DC_STORE, 'readwrite');
      tx.objectStore(DC_STORE).put(doc);
      tx.oncomplete = function(){ res(); };
      tx.onerror = function(){ rej(tx.error); };
    });
  });
}
function dcDel(id) {
  return dcOpen().then(function(db){
    return new Promise(function(res, rej){
      var tx = db.transaction(DC_STORE, 'readwrite');
      tx.objectStore(DC_STORE).delete(id);
      tx.oncomplete = function(){ res(); };
      tx.onerror = function(){ rej(tx.error); };
    });
  });
}
/* 画像は縮小してJPEGに。読めない形式ならそのまま保存する */
function dcShrink(file) {
  if (file.type.indexOf('image/') !== 0) return Promise.resolve({ blob:file, type:file.type });
  return new Promise(function(res){
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.onload = function(){
      var max = 1800, w = img.width, h = img.height, s = Math.min(1, max / Math.max(w, h));
      var cv = document.createElement('canvas');
      cv.width = Math.round(w * s); cv.height = Math.round(h * s);
      cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
      URL.revokeObjectURL(url);
      cv.toBlob(function(b){ res(b ? { blob:b, type:'image/jpeg' } : { blob:file, type:file.type }); }, 'image/jpeg', 0.85);
    };
    img.onerror = function(){ URL.revokeObjectURL(url); res({ blob:file, type:file.type }); };
    img.src = url;
  });
}
function dcAdd(files) {
  var list = Array.prototype.slice.call(files || []);
  if (!list.length) return;
  var chain = Promise.resolve();
  list.forEach(function(f){
    chain = chain.then(function(){ return dcShrink(f); }).then(function(r){
      return dcPut({ id: Date.now() + '-' + Math.random().toString(36).slice(2, 7),
        name: f.name.replace(/\.[^.]+$/, ''), type: r.type, blob: r.blob, ts: Date.now() });
    });
  });
  chain.then(renderDocs).catch(function(){ renderDocs(); });
}
function renderDocs() {
  var host = document.getElementById('docs-host');
  if (!host) return;
  dcUrls.forEach(function(u){ URL.revokeObjectURL(u); }); dcUrls = [];
  if (!window.indexedDB) { host.innerHTML = '<div class="sec-hint">この端末では書類ポケットを使えません。</div>'; return; }
  dcAll().then(function(docs){
    docs.sort(function(a, b){ return a.ts - b.ts; });
    var h = '<div class="sec-hint">eチケット・バウチャー・パスポートのコピーなどの写真を入れておく場所。<b>この端末の中にだけ保存され、ネットには送られません</b>。写真アプリを探さずに、ここからすぐ出せます。</div>';
    h += '<label class="dc-add">＋ 写真・PDFを追加<input type="file" accept="image/*,.pdf,application/pdf" multiple onchange="dcAdd(this.files); this.value=\'\'"></label>';
    if (docs.length) {
      h += '<div class="dc-grid">';
      docs.forEach(function(d){
        var url = URL.createObjectURL(d.blob); dcUrls.push(url);
        var isPdf = d.type === 'application/pdf';
        h += '<div class="dc-item" data-id="' + d.id + '">' +
          (isPdf ? '<div class="dc-pdf" onclick="dcView(\'' + url + '\', true)">PDF</div>'
                 : '<img src="' + url + '" alt="" loading="lazy" onclick="dcView(\'' + url + '\', false)">') +
          '<input class="dc-name" value="' + String(d.name).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;') + '" placeholder="eチケット、バウチャー など" onchange="dcRename(\'' + d.id + '\', this.value)">' +
          '<button type="button" class="dc-del" onclick="dcRemove(this, \'' + d.id + '\')">削除</button></div>';
      });
      h += '</div>';
    } else {
      h += '<div class="sec-hint">まだ何も入っていません。</div>';
    }
    h += '<div class="dc-viewer" id="dc-viewer" onclick="dcClose(event)"><div id="dc-vbody"></div>' +
      '<button class="gd-close" onclick="dcClose(event, true)">×</button></div>';
    host.innerHTML = h;
  }).catch(function(){
    host.innerHTML = '<div class="sec-hint">書類ポケットを開けませんでした（プライベートブラウズでは使えません）。</div>';
  });
}
function dcRename(id, name) {
  dcAll().then(function(docs){
    var d = null; docs.forEach(function(x){ if (x.id === id) d = x; });
    if (d) { d.name = name; return dcPut(d); }
  });
}
/* 削除は2タップ（1回目で赤くなり、5秒以内にもう1回で消す） */
function dcRemove(btn, id) {
  if (!btn.classList.contains('arm')) {
    btn.classList.add('arm'); btn.textContent = 'もう一度タップで削除';
    setTimeout(function(){ btn.classList.remove('arm'); btn.textContent = '削除'; }, 5000);
    return;
  }
  dcDel(id).then(renderDocs);
}
function dcView(url, isPdf) {
  var v = document.getElementById('dc-viewer'), b = document.getElementById('dc-vbody');
  if (!v || !b) return;
  b.innerHTML = isPdf ? '<iframe src="' + url + '"></iframe>' : '<img src="' + url + '" alt="">';
  v.classList.add('on');
}
function dcClose(e, force) {
  if (!force && e.target.id !== 'dc-viewer') return;
  var v = document.getElementById('dc-viewer'); if (v) v.classList.remove('on');
  var b = document.getElementById('dc-vbody'); if (b) b.innerHTML = '';
}
