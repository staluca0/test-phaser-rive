// const CACHE_NAME = `my-game-cache-${new Date().toISOString()}`;

// // Un elenco delle risorse che vuoi pre-cacheare.
// const urlsToCache = [
//     'index.html',
//     'main.js',
//     'main.css',
//     'res/'
// ];

// self.addEventListener('install', function(event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then(function(cache) {
//                 console.log('Apertura cache');
//                 return cache.addAll(urlsToCache);
//             })
//             .then(self.skipWaiting()) // Attiva il Service Worker non appena l'installazione è completata
//     );
// });

// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request).then(cachedResponse => {
//             const fetchPromise = fetch(event.request).then(networkResponse => {
//                 // Controlla se abbiamo ricevuto una risposta valida
//                 if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
//                     caches.open(CACHE_NAME).then(cache => {
//                         cache.put(event.request, networkResponse.clone());
//                     });
//                 }
//                 return networkResponse;
//             });
//             return cachedResponse || fetchPromise;
//         })
//     );
// });

// self.addEventListener('activate', event => {
//     const currentCaches = [CACHE_NAME];
//     event.waitUntil(
//         caches.keys().then(cacheNames => {
//             return Promise.all(
//                 cacheNames.filter(cacheName => !currentCaches.includes(cacheName))
//                           .map(cacheName => caches.delete(cacheName))
//             );
//         })
//     );
// });
