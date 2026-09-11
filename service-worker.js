// ★デプロイのたびに必ずこの版番号を上げる（新SWを検知→installで即skipWaiting→自動で最新化）
//   app.js の APP_VERSION も同じ値に揃える
const CACHE_NAME = 'kizai-cache-v83';

// PWA用にアイコン等だけキャッシュ（アプリ本体は一切キャッシュしない＝常に最新）
const CORE_ASSETS = ['/manifest.json', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', event => {
  // 新版は即座に有効化して待機状態を作らない（＝更新バナーのループを原理的に防止・詰まったPWAも自動回復）
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(CORE_ASSETS.map(url => cache.add(url)))
    )
  );
});

// アプリから「更新」を押されたら待機中の新SWを有効化
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
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
  // アプリ本体（自サイトのHTML/JS/CSS・ナビゲーション）だけ常にネットワークから（キャッシュしない＝古い版を出さない）。
  // ※外部CDNの .css（アイコン等）はここに含めない＝毎回no-storeで取り直して真っ黒待ちになるのを防ぐ
  const isAppCode = isLocal && (req.mode === 'navigate' || url.endsWith('/') || /\.(html|js|css)(\?.*)?$/.test(url));

  if (isAppCode) {
    event.respondWith(
      fetch(req, { cache: 'no-store' }).catch(() => caches.match(req))
    );
    return;
  }

  // それ以外（ローカル画像・manifest／外部CDNのフォント・アイコン）は cache-first。
  // 版はURLで固定されているので、一度キャッシュすれば次回以降は即表示＝CDNが遅くても待たない。
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(response => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, clone)).catch(() => {});
      return response;
    }).catch(() => cached))
  );
});
