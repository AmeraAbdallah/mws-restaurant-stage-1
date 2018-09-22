const version = 'sw-v6';
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(version).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/dist/css/styles.css',
        '/dist/js/dbhelper.js',
        '/dist/js/main.js',
        '/dist/js/restaurant_info.js',
        '/dist/js/idb.js',
        '/dist/img/',
        '/dist/img/1.jpg',
        '/dist/img/2.jpg',
        '/dist/img/3.jpg',
        '/dist/img/4.jpg',
        '/dist/img/5.jpg',
        '/dist/img/6.jpg',
        '/dist/img/7.jpg',
        '/dist/img/8.jpg',
        '/dist/img/9.jpg',
        '/dist/img/10.jpg',
      ]).then(() => {
      //  console.log('urls cached successfuly ');
      }).catch((error) => {
       console.log('some thing wrong : ', error);
      })
    })
  );
 });
 
 self.addEventListener('activate', (event) => {
  //  console.log('service worker active...');
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
  // ignoring cachind review requests
  var request = event.request;
    if (request.method === 'GET' && request.url.startsWith( `http://localhost:1337/reviews/?restaurant_id=`)) {
        event.respondWith(fetch(request));
        // console.log(request);
        return;
    }
  event.respondWith(
    caches.match(event.request, {'ignoreSearch':true}).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open(version).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    })
  );
 });