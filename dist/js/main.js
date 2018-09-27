let restaurants,neighborhood,cuisines;var newMap,markers=[];"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").then(function(e){}).catch(function(e){console.log("Service Worker registration failed ",e)}),document.addEventListener("DOMContentLoaded",e=>{initMap(),fetchNeighborhoods(),fetchCuisines()});const fetchNeighborhoods=()=>{DBHelper.fetchNeighborhoods((e,t)=>{e?console.error(e):(self.neighborhoods=t,fillNeighborhoodsHTML())})},fillNeighborhoodsHTML=(e=self.neighborhoods)=>{const t=document.getElementById("neighborhoods-select");e.forEach(e=>{const n=document.createElement("option");n.innerHTML=e,n.value=e,t.append(n)})},fetchCuisines=()=>{DBHelper.fetchCuisines((e,t)=>{e?console.error(e):(self.cuisines=t,fillCuisinesHTML())})},fillCuisinesHTML=(e=self.cuisines)=>{const t=document.getElementById("cuisines-select");e.forEach(e=>{const n=document.createElement("option");n.innerHTML=e,n.value=e,t.append(n)})},initMap=()=>{self.newMap=L.map("map",{center:[40.722216,-73.987501],zoom:12,scrollWheelZoom:!1}),L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}",{mapboxToken:"pk.eyJ1IjoiYW1lcmEiLCJhIjoiY2ptNWUxdmQ0MHV1aTNrdDN0M3hta2JuNSJ9.kBhLNxEwdPQcMTcFN3ijUA",maxZoom:18,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',id:"mapbox.streets"}).addTo(newMap),updateRestaurants()},updateRestaurants=()=>{const e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),n=e.selectedIndex,a=t.selectedIndex,r=e[n].value,s=t[a].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(r,s,(e,t)=>{e?console.error(e):(resetRestaurants(t),fillRestaurantsHTML())})},resetRestaurants=e=>{self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers.forEach(e=>e.setMap(null)),self.markers=[],self.restaurants=e},fillRestaurantsHTML=(e=self.restaurants)=>{const t=document.getElementById("restaurants-list");e.forEach(e=>{t.append(createRestaurantHTML(e))}),addMarkersToMap()},createRestaurantHTML=e=>{const t=document.createElement("li");t.role="listitem";const n=document.createElement("img");n.className="restaurant-img",n.alt="restaurant image",n.src=DBHelper.imageUrlForRestaurant(e),t.append(n);const a=document.createElement("h3");a.innerHTML=e.name,t.append(a);const r=document.createElement("p");r.innerHTML=e.neighborhood,t.append(r);const s=document.createElement("p");s.innerHTML=e.address,t.append(s);const o=document.createElement("h4");o.innerHTML="★",o.classList.add("fav_btn"),"true"===e.is_favorite&&o.classList.add("favourite"),o.onclick=function(){let t;if(t="true"===e.is_favorite?"false":"true",o.classList.toggle("favourite"),!navigator.onLine)return e.is_favorite=t,void DBHelper.handleFavouriteWheneOffline(t,e);e.is_favorite=t,DBHelper.handleFavourite(t,e)},t.append(o);const i=document.createElement("a");return i.innerHTML="View Details",i.href=DBHelper.urlForRestaurant(e),i.setAttribute("aria-label","View Details of "+e.name),t.append(i),t},addMarkersToMap=(e=self.restaurants)=>{e.forEach(e=>{const t=DBHelper.mapMarkerForRestaurant(e,self.newMap);t.on("click",function(){window.location.href=t.options.url})})};