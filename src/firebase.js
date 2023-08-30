const {initializeApp} = require("firebase/app");
const {getFirestore, collection, getDocs, doc, setDoc} = require("firebase/firestore");

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCpOEM5_RxgIyfhSncty9O7oHLpvFUbP20",
    authDomain: "nftmarketplace226.firebaseapp.com",
    projectId: "nftmarketplace226",
    storageBucket: "nftmarketplace226.appspot.com",
    messagingSenderId: "967979187767",
    appId: "1:967979187767:web:3191732b97e188c57dc9b2"
});

const db = getFirestore(firebaseApp);

async function getCities(db) {
    const citiesCol = collection(db, 'usersContractsIds');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
}

async function write(db) {
    const data = ({contract: "0xBDf761788135C7d7Aa76E6671f63462A07C53E2D", value: [2, 6]});
    const res = await setDoc(doc(db, "usersContractsIds", "12"), data);
}

getCities(db).then(data => console.log(data));
write(db);


// Initialize Firebase
// const app = initializeApp(firebaseConfig);