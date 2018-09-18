
const dbPromise = idb.open('restaurantDb', 1, (upgradeDb) => {
    upgradeDb.createObjectStore('restaurants');
});
    
    
function addToRestaurantOS(data){
    dbPromise.then((db) => {
        const tx = db.transaction('restaurants', 'readwrite');
        const store = tx.objectStore('restaurants');
        store.put(data,"restaurants");
        return tx.complete;
    }).then(()=>{
        // console.log('added Items to the  store :) ');
    }).catch((error) => {
        console.log(error);
    });
}

function getFromRestaurantOS(){
    const  promise = new Promise (function(resolve, reject){
        dbPromise.then((db) => {
            const tx = db.transaction('restaurants', 'readwrite');
            const store = tx.objectStore('restaurants');
            const restaurants = store.get("restaurants");
            return restaurants;
        }).then((restaurants)=>{
            if(restaurants)
                resolve(restaurants);
            else 
                reject('no data');
            // console.log(' done successfuly !');
        }).catch((error) => {
            reject('no data');
            console.log(error);
        });
    });
    return promise;
}

      
