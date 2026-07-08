/* Service Worker — 旅の手帳（ルート本番）オフライン対応
 * - アプリ本体＋DAY写真＋アイコンをプリキャッシュ
 * - Google Fonts は初回オンライン閲覧時にキャッシュ→以後オフラインでも同じ書体
 * - ナビゲーションは network-first（オンライン時は常に最新）
 * - 為替API・Googleマップ等の外部は介入しない
 * 更新時は CACHE のバージョンを上げる。
 * キャッシュ名の運用: このSWは 'tabi-techo-root-*' を管理し、
 * 旧世代（tabi-shiori-v* / tabi-techo-v*）は一度だけ掃除する。
 * /v1/ のアーカイブ（tabi-shiori-arch-*）には触れない。
 */
const CACHE = 'tabi-techo-root-v4';
const ASSETS = [
  './',
  './index.html',
  './pages.css',
  './trip.js',
  './map.js',
  './prep.js',
  './info.js',
  './news.js',
  './articles.json',
  './manifest.webmanifest',
  './assets/day1.jpg', './assets/day2.jpg', './assets/day3.jpg', './assets/day4.jpg',
  './assets/day5.jpg', './assets/day6.jpg', './assets/day7.jpg',
  './assets/scrap-laneway.jpg', './assets/scrap-qvm.jpg', './assets/scrap-koala.jpg', './assets/scrap-opera.jpg',
  './assets/hero-sydney.jpg',
  './assets/app-icon-180.png', './assets/app-icon-192.png', './assets/app-icon-512.png'
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
      return Promise.all(keys.filter(function (k) {
        if (k === CACHE) return false;
        return k.indexOf('tabi-techo-root-') === 0 ||   // 自分の旧世代
               k.indexOf('tabi-shiori-v') === 0 ||       // 旧ルートアプリの残骸
               k.indexOf('tabi-techo-v') === 0;          // 旧 /v2/ の残骸
      }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  var isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== location.origin && !isFont) return;
  if (url.pathname.indexOf('/v1/') !== -1 || url.pathname.indexOf('/v2/') !== -1) return; // 旧版には介入しない

  var isNav = req.mode === 'navigate' ||
              url.pathname.endsWith('/') ||
              url.pathname.endsWith('index.html') ||
              url.pathname.endsWith('articles.json'); // 朝刊は network-first（毎朝更新されるため）

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
