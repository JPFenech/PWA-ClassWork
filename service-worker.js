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
    'images/icon512.png',
    'images/icon32.png'

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

addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;     // if valid response is found in cache return it
          } else {
            return fetch(event.request)     //fetch from internet
              .then(function(res) {
                return caches.open(CACHE_DYNAMIC_NAME)
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());    //save the response for future
                    return res;   // return the fetched data
                  })
              })
              .catch(function(err) {       // fallback mechanism
                return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
                  .then(function(cache) {
                    return cache.match('/offline.html');
                  });
              });
          }
        })
    );
  });       

// self.addEventListener('fetch', function (e) {
//     e.respondWith(
//         caches.match(e.request).then(function (r){
//             return r || fetch(e.request).then (function (response){
//                  return caches.open(cacheName).then(function(cache){
//                      cache.put(e.reuqest, response.clone());
//                      return response;
//                  });
//             });
//         })
//     );
// });