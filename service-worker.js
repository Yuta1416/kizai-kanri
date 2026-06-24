const CACHE_NAME = 'kizai-cache-v7';

// PWA用にアイコン等だけキャッシュ（アプリ本体は一切キャッシュしない＝常に最新）
const CORE_ASSETS = ['/manifest.json', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(CORE_ASSETS.map(url => cache.add(url)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = req.url;
  if (req.method !== 'GET') return;
  if (url.includes('script.google.com')) return; // GAS APIは触らない

  const isLocal = url.startsWith(self.location.origin);
  // アプリ本体（HTML/JS/CSS・ナビゲーション）は常にネットワークから（キャッシュしない＝古い版を出さない）
  const isAppCode = req.mode === 'navigate' || url.endsWith('/') || /\.(html|js|css)(\?.*)?$/.test(url);

  if (isAppCode) {
    event.respondWith(
      fetch(req, { cache: 'no-store' }).catch(() => caches.match(req))
    );
    return;
  }

  // ローカルの画像・manifestなど：cache-first（変化が少ない）
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
