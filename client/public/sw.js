/*
  ETLAQ PWA Service Worker

  Strategy:
  - Navigations (HTML): Network First (fallback to cached shell)
  - /assets/*          : Cache First (hashed files)
  - Images             : Stale While Revalidate
  - Everything else    : Stale While Revalidate

  This is intentionally lightweight and dependency-free.
*/

const VERSION = '2026.01.31';
const APP_CACHE = `etlaq-app-${VERSION}`;
const ASSET_CACHE = `etlaq-assets-${VERSION}`;
const IMAGE_CACHE = `etlaq-images-${VERSION}`;

const CORE = [
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  '/logo.png',
  '/robots.txt',
  '/sitemap.xml',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(APP_CACHE)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => !k.includes(VERSION))
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req, { ignoreSearch: true });
  if (cached) return cached;
  const res = await fetch(req);
  if (res && res.ok) cache.put(req, res.clone());
  return res;
}

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    const cached = await cache.match(req, { ignoreSearch: true });
    return cached || caches.match('/index.html');
  }
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req, { ignoreSearch: true });
  const fetchPromise = fetch(req)
    .then((res) => {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // HTML navigation
  if (req.mode === 'navigate') {
    event.respondWith(networkFirst(req, APP_CACHE));
    return;
  }

  // Hashed assets
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirst(req, ASSET_CACHE));
    return;
  }

  // Images
  if (
    req.destination === 'image' ||
    url.pathname.startsWith('/gallery/') ||
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/article-images/') ||
    url.pathname.startsWith('/og-articles/')
  ) {
    event.respondWith(staleWhileRevalidate(req, IMAGE_CACHE));
    return;
  }

  // Default
  event.respondWith(staleWhileRevalidate(req, APP_CACHE));
});
