/* Service Worker — オフライン対応（電波が無くてもアプリが開く）
 * 戦略：
 *  - ナビゲーション(index.html)は network-first（オンライン時は最新、オフライン時はキャッシュ）
 *  - その他の同一オリジン資産は cache-first（高速・オフライン可）
 *  - 外部(API/地図など)は介入せず通常どおりネットワークへ
 * 内容を更新したら CACHE のバージョン名を上げると確実に更新される。
 */
const CACHE = 'tabi-shiori-arch-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  '../assets/app-icon-180.png',
  '../assets/app-icon-192.png',
  '../assets/app-icon-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return; // 外部(API・地図等)はそのまま

  var isNav = req.mode === 'navigate' ||
              url.pathname.endsWith('/') ||
              url.pathname.endsWith('index.html');

  if (isNav) {
    // network-first：最新を取りつつ、オフラインはキャッシュ
    e.respondWith(
      fetch(req).then(function (res) {
        var cp = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, cp); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (r) { return r || caches.match('./index.html'); });
      })
    );
  } else {
    // cache-first：資産は高速＆オフライン
    e.respondWith(
      caches.match(req).then(function (cached) {
        return cached || fetch(req).then(function (res) {
          var cp = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, cp); });
          return res;
        });
      })
    );
  }
});
