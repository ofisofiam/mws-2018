var staticCacheName = 'ofi-mws';
var mapBoxCacheName = 'ofi-mws-restaurant'
var allCaches = [
    staticCacheName,
    mapBoxCacheName
];

var urlsToCache = [
    '/',
    '/images/temp.png',
    '/main.js',
    '/project1/add2numbers.html',
    '/project1/add2numbers.js',
    '/project2/index.html',
    '/project2/leaflet.js',
    '/project2/leaflet.css',,
    '/project2/styles.css',
    '/final/index.html',
    '/final/fetch.js',
    '/final/data.json'
];

self.addEventListener('install',function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener('active',function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('ofi-mws')
                    && !allCaches.includes(cacheName);
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            )
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});



