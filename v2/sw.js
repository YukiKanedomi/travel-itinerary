/* v2 Service Worker — 旅の手帳のオフライン対応
 * - アプリ本体＋DAY写真＋アイコンをプリキャッシュ（インストール時に全部保存）
 * - Google Fonts（css/woff2）は初回オンライン閲覧時にキャッシュ→以後オフラインでも同じ書体
 * - ナビゲーションは network-first（オンライン時は常に最新）
 * - 為替API・Googleマップ等の外部は介入しない
 * 更新時は CACHE のバージョンを上げる。
 */
const CACHE = 'tabi-techo-v2';
const ASSETS = [
  './',
  './index.html',
  './pages.css',
  './trip.js',
  './map.js',
  './prep.js',
  './info.js',
  './manifest.webmanifest',
  '../assets/day1.jpg', '../assets/day2.jpg', '../assets/day3.jpg', '../assets/day4.jpg',
  '../assets/day5.jpg', '../assets/day6.jpg', '../assets/day7.jpg',
  '../assets/app-icon-180.png', '../assets/app-icon-192.png', '../assets/app-icon-512.png'
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

  var isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== location.origin && !isFont) return; // 為替API・地図等はそのまま

  var isNav = req.mode === 'navigate' ||
              url.pathname.endsWith('/') ||
              url.pathname.endsWith('index.html');

  if (isNav) {
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
    // 資産・フォント：cache-first（フォントは opaque レスポンスもそのまま保存）
    e.respondWith(
      caches.match(req).then(function (cached) {
        return cached || fetch(req).then(function (res) {
          if (res && (res.ok || res.type === 'opaque')) {
            var cp = res.clone();
            caches.open(CACHE).then(function (c) { c.put(req, cp); });
          }
          return res;
        });
      })
    );
  }
});
