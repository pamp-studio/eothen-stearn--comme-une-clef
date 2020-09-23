var cacheHistory = ['v0.01','v0.02'];
var cacheName = 'v0.03';
var urlsToCache = [
  'index.html',
  'style.css',
  'js/script.js',
  'media/audio/Eothen-Stearn-Comme-Une-Clef.mp3'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) { 
          return response;
        }
        return fetch(event.request).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();
            caches.open(cacheName)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheHistory.indexOf(cacheName) !== -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});