const CACHE_NAME = 'bahja-static-v1';
const OFFLINE_URLS = ['/', '/manifest.webmanifest', '/favicon.ico'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('/')));
    return;
  }

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.destination === 'image' || event.request.destination === 'style' || event.request.destination === 'script' || event.request.destination === 'font') {
    event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const cloned = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
      return response;
    })));
  }
});
