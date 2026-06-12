/* FOUNDER MODE offline cache */
const CACHE = 'founder-mode-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './pixel/index.html',
  './pixel/assets/21_Clothing_Store.png',
  './pixel/assets/1_Generic_16x16.png',
  './pixel/assets/Room_Builder_Floors_16x16.png',
  './pixel/assets/Room_Builder_Walls_16x16.png',
  './pixel/assets/Adam_idle_16x16.png',
  './pixel/assets/Adam_run_16x16.png',
  './pixel/assets/Alex_idle_16x16.png',
  './pixel/assets/Alex_run_16x16.png',
  './pixel/assets/Amelia_idle_16x16.png',
  './pixel/assets/Amelia_run_16x16.png',
  './pixel/assets/Bob_idle_16x16.png',
  './pixel/assets/Bob_run_16x16.png',
  './pixel/assets/Molly_idle_16x16.png',
  './pixel/assets/Molly_run_16x16.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request))
  );
});
