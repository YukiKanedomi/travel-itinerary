/* 旧 /v2/ の Service Worker — 自己解除のみ行う（本番はルートへ移転済み） */
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(self.registration.unregister());
});
