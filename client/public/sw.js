/*
  ETLAQ PWA Service Worker (Safe Cache)

  Main goal: avoid caching stale HTML as JS chunks.
  A common failure mode on SPAs is that a missing /assets/*.js request gets rewritten to /index.html (200 text/html).
  If a SW caches that response, the app will keep breaking even after reloads.

  Strategy:
  - Navigations (HTML): Network First (fallback to cached shell)
  - /assets/*          : Cache First (BUT never cache text/html, and never ignore querystring)
  - Images             : Stale While Revalidate
  - Everything else    : Stale While Revalidate

  Lightweight and dependency-free.
*/

const VERSION = '2026.02.14';
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
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => !k.includes(VERSION))
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Allow the page to request immediate activation.
self.addEventListener('message', (event) => {
  if (event?.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

function isHtmlResponse(res) {
  const ct = (res?.headers?.get('content-type') || '').toLowerCase();
  return ct.includes('text/html');
}

async function cacheFirstSafeAsset(req) {
  const cache = await caches.open(ASSET_CACHE);

  // IMPORTANT: do NOT ignore query-string here.
  // If the app adds a cache-buster, it must bypass any bad cached response.
  const cached = await cache.match(req);
  if (cached) {
    // Guard: if a bad HTML response was cached under /assets/*, purge it.
    if (isHtmlResponse(cached)) {
      await cache.delete(req);
    } else {
      return cached;
    }
  }

  try {
    const res = await fetch(req, { cache: 'no-store' });
    if (res && res.ok && !isHtmlResponse(res)) {
      cache.put(req, res.clone());
    }
    return res;
  } catch {
    // As a last resort, try any cached variant (without search) just to avoid full break.
    const fallback = await cache.match(req, { ignoreSearch: true });
    return fallback || Response.error();
  }
}

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req, { cache: 'no-store' });
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
  const fetchPromise = fetch(req, { cache: 'no-store' })
    .then((res) => {
      if (res && res.ok && !isHtmlResponse(res)) cache.put(req, res.clone());
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
    event.respondWith(cacheFirstSafeAsset(req));
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
