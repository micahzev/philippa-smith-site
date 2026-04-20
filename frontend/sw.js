/* Philippa Smith — Service Worker
 *
 * Strategy:
 *  - Shell (HTML/manifest/icons) cached on install.
 *  - Sanity API responses: network-first so content is always fresh when
 *    online, with a cached fallback for offline use. (Previously
 *    stale-while-revalidate, which caused new works to appear one load late.)
 *  - Sanity CDN images: cache-first (content-addressed URLs never change).
 *  - Everything else network-first.
 *
 * Bump CACHE_VERSION whenever you change the shell or invalidation strategy.
 */

const CACHE_VERSION = 'v2';
const SHELL_CACHE   = `ps-shell-${CACHE_VERSION}`;
const DATA_CACHE    = `ps-data-${CACHE_VERSION}`;
const IMG_CACHE     = `ps-img-${CACHE_VERSION}`;

const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/favicon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((c) => c.addAll(SHELL_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => ![SHELL_CACHE, DATA_CACHE, IMG_CACHE].includes(k))
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Sanity image CDN — immutable URLs, cache-first
  if (url.hostname.endsWith('cdn.sanity.io')) {
    event.respondWith(cacheFirst(req, IMG_CACHE));
    return;
  }

  // Sanity API — network-first so we always get fresh content when online.
  // Falls back to the cached response only if the network is unavailable.
  if (url.hostname.endsWith('api.sanity.io') || url.hostname.endsWith('apicdn.sanity.io')) {
    event.respondWith(networkFirst(req, DATA_CACHE));
    return;
  }

  // Same-origin shell — network-first with cache fallback
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(req, SHELL_CACHE));
    return;
  }

  // Fonts & other CDN — stale-while-revalidate
  event.respondWith(staleWhileRevalidate(req, SHELL_CACHE));
});

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    return cached || Response.error();
  }
}
async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    const cached = await cache.match(req);
    return cached || cache.match('/index.html');
  }
}
async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const network = fetch(req).then((res) => {
    if (res.ok) cache.put(req, res.clone());
    return res;
  }).catch(() => null);
  return cached || network || Response.error();
}
