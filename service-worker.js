const CACHE_NAME = 'kizai-cache-v5';

// オフライン用に保持したいローカルアセット
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// インストール時：ローカルアセットをキャッシュ（失敗しても続行）
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(CORE_ASSETS.map(url => cache.add(url)))
    )
  );
  self.skipWaiting();
});

// 古いキャッシュを削除して即時制御
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// HTML/JS/CSS は常に最新を取りに行く（network-first）。
// オフライン時のみキャッシュにフォールバック。画像等は cache-first。
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = req.url;

  // GAS API はキャッシュしない
  if (url.includes('script.google.com')) return;
  if (req.method !== 'GET') return;

  const isLocal = url.startsWith(self.location.origin);

  // アプリ本体（HTML/JS/CSS・ナビゲーション）は network-first で常に最新
  const isAppCode = req.mode === 'navigate' || url.endsWith('/') || /\.(html|js|css)(\?.*)?$/.test(url);

  if (isAppCode) {
    event.respondWith(
      fetch(req).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        return response;
      }).catch(() => caches.match(req).then(c => c || caches.match('/index.html')))
    );
    return;
  }

  // ローカルの画像・manifest など：cache-first（変化が少ない）
  if (isLocal) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        return response;
      }))
    );
    return;
  }

  // 外部CDN（フォント・アイコン）：network-first
  event.respondWith(
    fetch(req).then(response => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
      return response;
    }).catch(() => caches.match(req))
  );
});
