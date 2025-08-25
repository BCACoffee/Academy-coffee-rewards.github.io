// Cache-first service worker for the PWA
const CACHE_NAME = 'academy-cloud-rewards-v1';
const ASSETS = [
  './','./index.html','./customer.html','./qr_card.html','./qr_all.html',
  './manifest.webmanifest','./sw.js','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      const copy = res.clone(); caches.open(CACHE_NAME).then(c => c.put(e.request, copy)); return res;
    }))
  );
});
