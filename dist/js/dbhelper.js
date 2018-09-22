class DBHelper{static get DATABASE_URL(){return"http://localhost:1337"}static fetchRestaurants(e){getFromRestaurantOS().then(t=>{e(null,t)}).catch(t=>{fetch(`${DBHelper.DATABASE_URL}/restaurants`).then(e=>e.json()).then(t=>{addToRestaurantOS(t),e(null,t)}).catch(t=>{e(`Request failed. Returned status of ${t}`,null)})})}static fetchReviewsByRestId(e){return new Promise((t,s)=>{fetch(`${DBHelper.DATABASE_URL}/reviews/?restaurant_id=${e}`).then(e=>(console.log("fetched"),e.json())).then(e=>{addToReviewsOS(e),t(e)}).catch(l=>{console.log(`Request failed. Reviews failed fetched .. ${l}`),getFromReviewsOS(e).then(e=>{console.log("promise hh resolvee",e),t(e)}).catch(e=>{console.log("promise  hh reject",e),s(e)})})})}static fetchRestaurantById(e,t){DBHelper.fetchRestaurants((s,l)=>{if(s)t(s,null);else{const s=l.find(t=>t.id==e);s?t(null,s):t("Restaurant does not exist",null)}})}static fetchRestaurantByCuisine(e,t){DBHelper.fetchRestaurants((s,l)=>{if(s)t(s,null);else{const s=l.filter(t=>t.cuisine_type==e);t(null,s)}})}static fetchRestaurantByNeighborhood(e,t){DBHelper.fetchRestaurants((s,l)=>{if(s)t(s,null);else{const s=l.filter(t=>t.neighborhood==e);t(null,s)}})}static fetchRestaurantByCuisineAndNeighborhood(e,t,s){DBHelper.fetchRestaurants((l,a)=>{if(l)s(l,null);else{let l=a;"all"!=e&&(l=l.filter(t=>t.cuisine_type==e)),"all"!=t&&(l=l.filter(e=>e.neighborhood==t)),s(null,l)}})}static fetchNeighborhoods(e){DBHelper.fetchRestaurants((t,s)=>{if(t)e(t,null);else{const t=s.map((e,t)=>s[t].neighborhood),l=t.filter((e,s)=>t.indexOf(e)==s);e(null,l)}})}static fetchCuisines(e){DBHelper.fetchRestaurants((t,s)=>{if(t)e(t,null);else{const t=s.map((e,t)=>s[t].cuisine_type),l=t.filter((e,s)=>t.indexOf(e)==s);e(null,l)}})}static urlForRestaurant(e){return`./restaurant.html?id=${e.id}`}static imageUrlForRestaurant(e){return 10===e.id?"/dist/img/10.jpg":`/dist/img/${e.photograph}.jpg`}static mapMarkerForRestaurant(e,t){const s=new L.marker([e.latlng.lat,e.latlng.lng],{title:e.name,alt:e.name,url:DBHelper.urlForRestaurant(e)});return s.addTo(newMap),s}}