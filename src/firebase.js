const {initializeApp} = require("firebase/app");
const {getFirestore, collection, getDocs, doc,arrayUnion,updateDoc, setDoc,arrayRemove} = require("firebase/firestore");

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
    const citiesCol = collection(db, 'usersNfts/0xBDf761788135C7d7Aa76E6671f63462A07C53E2C/0xBDf761788135C7d7Aa76E6671f63462A07C53E2D');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
}

async function write(db) {
    const data = ({contract: "0xBDf761788135C7d7Aa76E6671f63462A07C53E2D", value: [2, 6]});
    const res = await setDoc(doc(db, "usersNfts", "0xBDf761788135C7d7Aa76E6671f63462A07C53E2R"), data);
}

async function update(db) {
    const data = ({contract: "0xBDf761788135C7d7Aa76E6671f63462A07C53E2N", value: [2,  7]});
    const res = await updateDoc(doc(db, "usersNfts", "0xBDf761788135C7d7Aa76E6671f63462A07C53E2R"), data);
}
async function updateArray(db) {
    const data = ({value: 10});
    const res = await updateDoc(doc(db, "usersNfts", "0xBDf761788135C7d7Aa76E6671f63462A07C53E2R"), {value: arrayUnion(10)});
}
async function removeFromArray(db) {
    const data = ({value: 10});
    const res = await updateDoc(doc(db, "usersNfts", "0xBDf761788135C7d7Aa76E6671f63462A07C53E2R"), {value: arrayRemove(2)});
}

getCities(db).then(data => console.log(data));
removeFromArray(db);


// Initialize Firebase
// const app = initializeApp(firebaseConfig);