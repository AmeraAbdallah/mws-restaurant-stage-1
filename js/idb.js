
const dbPromise = idb.open('restaurantDb', 2, (upgradeDb) => {
    switch(upgradeDb.oldVersion){
        case 0: upgradeDb.createObjectStore('restaurants');
        case 1: const reviewStore = upgradeDb.createObjectStore('reviews',{
                keyPath: 'id'
            });
             reviewStore.createIndex('restaurant', 'restaurant_id');
    }

    
});

function addToReviewsOS(reviews){
    dbPromise.then((db) => {
        const tx = db.transaction('reviews', 'readwrite');
        const store = tx.objectStore('reviews');
        if(Array.isArray(reviews)){
            reviews.forEach((review)=>{
                store.put(review);
            });
        }else{
            store.put(reviews,'reviews');
        }
        return tx.complete;
    }).then(()=>{
         console.log('added Items to review  store :) ');
    }).catch((error) => {
        console.log(error);
    });
}
    
function getFromReviewsOS(rest_id){
    const  promise = new Promise (function(resolve, reject){
        dbPromise.then((db) => {
            const tx = db.transaction('reviews', 'readwrite');
            const store = tx.objectStore('reviews');
            const index = store.index('restaurant');
            const reviews = index.getAll(rest_id);
            // console.log(reviews.json());
            console.log('get items from store ..');
            return reviews;
        }).then((reviews)=>{
            if(reviews){
                console.log('get items from store ..');
                resolve(reviews);
            }
            else 
                reject('no reviews');
                console.log(reviews);
        }).catch((error) => {
            reject('no data');
            console.log(error);
        });
    });
    return promise;
}
    
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

      
