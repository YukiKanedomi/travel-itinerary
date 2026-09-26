/* ============ vault.js — 記録と写真の金庫（端末に鍵を保存する合言葉ログイン） ============
 * 公開リポジトリに置くのは暗号文だけ。合言葉から PBKDF2 で鍵を作り、正しければ端末の
 * localStorage（vault_key_v1）に鍵を保存する。以後は入力なしで復号できる。
 * 使い方: Vault.hasKey() / Vault.unlock(pw) / Vault.load('journal') / Vault.forget()
 * 別ディレクトリのページからは Vault.base('../') のように金庫の場所を指定する。
 */
var Vault = (function () {
  var base = '', man = null, key = null, cache = {}, pending = {}, KEY = 'vault_key_v1';
  function b64d(s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function b64e(u) { var s = ''; for (var i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); }
  function manifest() {
    if (man) return Promise.resolve(man);
    return fetch(base + 'vault/manifest.json', { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('manifest ' + r.status);
      return r.json();
    }).then(function (m) { man = m; return m; });
  }
  function derive(pw, m) {
    return crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey'])
      .then(function (k) {
        return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64d(m.kdf.salt), iterations: m.kdf.iter, hash: m.kdf.hash || 'SHA-256' },
          k, { name: 'AES-GCM', length: 256 }, true, ['decrypt']);
      });
  }
  function dec(k, iv, ct) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, k, ct); }
  function check(k, m) {
    return dec(k, b64d(m.check.iv), b64d(m.check.ct))
      .then(function (buf) { return new TextDecoder().decode(buf) === 'tabi-techo-vault'; })
      .catch(function () { return false; });
  }
  function hasKey() { try { return !!localStorage.getItem(KEY); } catch (e) { return false; } }
  function loadKey() {
    if (key) return Promise.resolve(key);
    var raw = null; try { raw = localStorage.getItem(KEY); } catch (e) {}
    if (!raw) return Promise.reject(new Error('nokey'));
    return crypto.subtle.importKey('raw', b64d(raw), { name: 'AES-GCM' }, true, ['decrypt']).then(function (k) { key = k; return k; });
  }
  /* 合言葉を試す。正しければ鍵を端末に保存して true */
  function unlock(pw) {
    return manifest().then(function (m) {
      return derive(String(pw || '').trim(), m).then(function (k) {
        return check(k, m).then(function (ok) {
          if (!ok) return false;
          key = k; cache = {};
          return crypto.subtle.exportKey('raw', k).then(function (r) {
            try { localStorage.setItem(KEY, b64e(new Uint8Array(r))); } catch (e) {}
            return true;
          });
        });
      });
    });
  }
  /* 端末に保存した鍵が今の金庫に合うか（合言葉を変えた後の検知に使う） */
  function verify() {
    return Promise.all([manifest(), loadKey()]).then(function (a) { return check(a[1], a[0]); }).catch(function () { return false; });
  }
  function forget() { key = null; cache = {}; try { localStorage.removeItem(KEY); } catch (e) {} }
  /* 金庫の一区画（'journal' / 'photos-0924' など）を復号して JSON で返す */
  function load(id) {
    if (cache[id]) return Promise.resolve(cache[id]);
    if (pending[id]) return pending[id]; /* 取得中なら同じ約束を返す（並行呼び出しで二重に取らない） */
    pending[id] = Promise.all([manifest(), loadKey()]).then(function (a) {
      var m = a[0], k = a[1], p = null;
      m.parts.forEach(function (x) { if (x.id === id) p = x; });
      if (!p) throw new Error('no part ' + id);
      return fetch(base + 'vault/' + p.file).then(function (r) {
        if (!r.ok) throw new Error('fetch ' + r.status);
        return r.arrayBuffer();
      }).then(function (buf) {
        var u = new Uint8Array(buf);
        return dec(k, u.slice(0, 12), u.slice(12));
      }).then(function (buf) {
        var o = JSON.parse(new TextDecoder().decode(buf));
        cache[id] = o; delete pending[id]; return o;
      });
    }).catch(function (e) { delete pending[id]; throw e; });
    return pending[id];
  }
  /* IMG 番号 → その写真が入っている区画の id */
  function partOf(n) { return manifest().then(function (m) { var d = m.index && m.index[String(n)]; return d ? 'photos-' + d : null; }); }
  function photo(n) {
    return partOf(n).then(function (id) {
      if (!id) return null;
      return load(id).then(function (o) { var hit = null; o.items.forEach(function (x) { if (x.n === String(n)) hit = x; }); return hit; });
    });
  }
  /* 720px の写真 1 枚を復号して blob: URL で返す（同じ写真は使い回す） */
  var urls = {}; /* n → blob: URL の約束（取得中も同じ約束を共有する） */
  function photoURL(n) {
    n = String(n);
    if (urls[n]) return urls[n];
    urls[n] = Promise.all([manifest(), loadKey()]).then(function (a) {
      var m = a[0], k = a[1], f = m.photos && m.photos[n];
      if (!f) return null;
      return fetch(base + 'vault/p/' + f).then(function (r) {
        if (!r.ok) throw new Error('fetch ' + r.status);
        return r.arrayBuffer();
      }).then(function (buf) {
        var u = new Uint8Array(buf);
        return dec(k, u.slice(0, 12), u.slice(12));
      }).then(function (buf) {
        return URL.createObjectURL(new Blob([buf], { type: m.ptype || 'image/jpeg' }));
      });
    }).catch(function (e) { delete urls[n]; throw e; });
    return urls[n];
  }
  /* keep に無い写真の blob: URL を解放する（日を替えたときにメモリを返す） */
  function release(keep) {
    Object.keys(urls).forEach(function (n) {
      if (keep && keep[n]) return;
      var pr = urls[n]; delete urls[n];
      pr.then(function (u) { if (u) URL.revokeObjectURL(u); }).catch(function () {});
    });
  }
  return { base: function (b) { base = b; }, manifest: manifest, hasKey: hasKey, unlock: unlock, verify: verify, forget: forget, load: load, partOf: partOf, photo: photo, photoURL: photoURL, release: release };
})();
