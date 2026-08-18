/* Service Worker — 旅の手帳（ルート本番）オフライン対応
 * - アプリ本体＋DAY写真＋アイコンをプリキャッシュ
 * - Google Fonts は初回オンライン閲覧時にキャッシュ→以後オフラインでも同じ書体
 * - ナビゲーションは network-first（オンライン時は常に最新）
 * - 為替API・Googleマップ等の外部は介入しない
 * 更新時は CACHE のバージョンを上げ、index.html の ?v= と下の V も同じ番号に揃える。
 * （index.html は network-first なので、新HTMLが新しい ?v= 付きURLを参照すれば
 *   旧SWのキャッシュにヒットせず、CSS/JSだけ古い「ちぐはぐ表示」が起きない）
 * キャッシュ名の運用: このSWは 'tabi-techo-root-*' を管理し、
 * 旧世代（tabi-shiori-v* / tabi-techo-v*）は一度だけ掃除する。
 * /v1/ のアーカイブ（tabi-shiori-arch-*）には触れない。
 */
const CACHE = 'tabi-techo-root-v15';
const V = '15'; // index.html の ?v= と揃える
/* 必須シェル：1つでも取得に失敗したらインストール自体を失敗させる（約1MB） */
const CORE = [
  './',
  './index.html',
  './pages.css?v=' + V,
  './trip.js?v=' + V,
  './map.js?v=' + V,
  './prep.js?v=' + V,
  './guide.js?v=' + V,
  './info.js?v=' + V,
  './news.js?v=' + V,
  './articles.json',
  './manifest.webmanifest',
  './assets/app-icon-180.png', './assets/app-icon-192.png', './assets/app-icon-512.png'
];
/* 任意コンテンツ：1枚ずつ取得し、失敗してもインストールは成功させる（写真・誌面・挿絵 約16MB） */
const OPTIONAL = [
  './assets/day1.jpg', './assets/day2.jpg', './assets/day3.jpg', './assets/day4.jpg',
  './assets/day5.jpg', './assets/day6.jpg', './assets/day7.jpg',
  './assets/scrap-laneway.jpg', './assets/scrap-qvm.jpg', './assets/scrap-koala.jpg', './assets/scrap-opera.jpg',
  './assets/hero-sydney.jpg',
  './assets/art/magpie.png', './assets/art/binchicken.png', './assets/art/skybus.png', './assets/art/koala.png',
  './assets/art/smartgate.png', './assets/art/pie.png', './assets/art/coffee.png', './assets/art/suitcase.png',
  './assets/guide/p01.jpg', './assets/guide/p02.jpg', './assets/guide/p03.jpg', './assets/guide/p04.jpg',
  './assets/guide/p05.jpg', './assets/guide/p06.jpg', './assets/guide/p07.jpg', './assets/guide/p08.jpg',
  './assets/guide/p09.jpg', './assets/guide/p10.jpg', './assets/guide/p11.jpg', './assets/guide/p12.jpg',
  './assets/guide/p13.jpg', './assets/guide/p14.jpg', './assets/guide/p15.jpg', './assets/guide/p16.jpg',
  './assets/guide/p17.jpg', './assets/guide/p18.jpg', './assets/guide/p19.jpg', './assets/guide/p20.jpg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(CORE).then(function () {
        /* 任意分は個別追加。失敗は握り潰す（既にキャッシュ済みなら次回fetchで拾われる） */
        return Promise.all(OPTIONAL.map(function (u) {
          return c.add(u).catch(function () {});
        }));
      });
    }).then(function () { return self.skipWaiting(); })
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
        /* 404やエラーページはキャッシュしない。保存はイベント寿命に紐づける */
        if (res && res.ok) {
          var cp = res.clone();
          e.waitUntil(caches.open(CACHE).then(function (c) { return c.put(req, cp); }));
        }
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
            e.waitUntil(caches.open(CACHE).then(function (c) { return c.put(req, cp); }));
          }
          return res;
        });
      })
    );
  }
});
