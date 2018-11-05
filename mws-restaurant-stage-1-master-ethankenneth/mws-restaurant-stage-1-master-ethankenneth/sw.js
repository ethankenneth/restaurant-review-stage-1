// cache requests to all of the site’s assets
var staticCacheName = 'cache_v01';
var urlsToCache = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js'
];// End var urlsToCache

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );// End event.waitUntil
});// End self.addEventListener('install', function(event))

// cache requests to all of the site's assets
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName != staticCacheName;
        }).map(function(cacheName) {
            return caches.delete(cacheName);
          })// End .map(function(cacheName))
      );
    })// End caches.keys().then(function(cacheNames))
  )
});// End self.addEventListener('active', function(event))

// Only caching needs to be implemented
self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.open(staticCacheName).then(function(cache) {
      return fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
      }).catch(function(){
        return caches.match(event.request);
      });// End .catch(function())
    })// End caches.open(staticCacheName).then(function(cache))
  );
})// End self.addEventListener('fetch', function(event))
