var cacheName = 'lessonstore';
var cacheFiles = [ 
    'index.html',
    'products.js',
    'style.css',
    'lessons.webmanifest',
    'images/piano.jpg',
    'images/physics.jpg',
    'images/maths.jpg',
    'images/language.jpg',
    'images/karate.jpg',
    'images/gymnastics.jpg',
    'images/guitar.jpg',
    'images/computer.jpg',
    'images/icon512.png'
    
];

self.addEventListener('install', (e) =>  {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r){
            return r || fetch(e.request).then (function (response){
                 return caches.open(cacheName).then(function(cache){
                     cache.put(e.reuqest, response.clone());
                     return response;
                 });
            });
        })
    );
});