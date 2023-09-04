const {initializeApp} = require("firebase/app");
const {getFirestore} = require("firebase/firestore");

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCpOEM5_RxgIyfhSncty9O7oHLpvFUbP20",
    authDomain: "nftmarketplace226.firebaseapp.com",
    projectId: "nftmarketplace226",
    storageBucket: "nftmarketplace226.appspot.com",
    messagingSenderId: "967979187767",
    appId: "1:967979187767:web:3191732b97e188c57dc9b2"
});

export const db = getFirestore(firebaseApp);