const version = 'v6';
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(version).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        // '/data/restaurants.json',
        '/img/',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
      ]).then(() => {
       console.log('urls cached successfuly ');
      }).catch((error) => {
       console.log('some thing wrong : ', error);
      })
    })
  );
 });
 
 self.addEventListener('activate', (event) => {
   console.log('service worker active...');
   var cacheWhitelist = [version];
    event.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
 });
 
 self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open(version).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    })
  );
 });