self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('mws').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/data/restaurants.json',
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
   //todo
 });
 
 self.addEventListener('fetch', (event) => {
   event.respondWith(
     caches.open('mws').then((cache) => {
       return cache.match(event.request).then((response) => {
         return response || fetch(event.request).then((response) => {
           cache.put(event.request, response.clone());
           return response;
         });
       });
     })
   );
 });