const {initializeApp} = require("firebase/app");
const {
    getFirestore,
    collection,
    getDocs,
    doc,
    arrayUnion,
    updateDoc,
    getDoc,
    setDoc,
    query, where,
    arrayRemove
} = require("firebase/firestore");
const hash = require('object-hash');

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCpOEM5_RxgIyfhSncty9O7oHLpvFUbP20",
    authDomain: "nftmarketplace226.firebaseapp.com",
    projectId: "nftmarketplace226",
    storageBucket: "nftmarketplace226.appspot.com",
    messagingSenderId: "967979187767",
    appId: "1:967979187767:web:3191732b97e188c57dc9b2"
});

const db = getFirestore(firebaseApp);

async function getAccountInfo(db, collect, account) {
    const docRef = doc(db, collect, account);
    return await getDoc(docRef);
}

async function getAccountDataHash(db, collect, account) {
    const querySnapshot = await getDocs(collection(db, collect, account, "hash"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
}

async function write(db, collect,) {
    const data = {contract: "0xBDf761788135C7d7Aa76E6671f63462A07C53E2D", value: [2, 1]};
    data.hash = hash(data);
    const res = await setDoc(doc(db, collect, "new"), data);
}

async function update(db) {
    const data = ({value: [2, 7], hash: "hkdhf823ufp2jfpi2pjf"});
    const res = await updateDoc(doc(db, "usersNfts26", "hash"), data);
}

async function updateArray(db) {
    const data = ({value: 10});
    const res = await updateDoc(doc(db, "usersNfts", "0xBDf761788135C7d7Aa76E6671f63462A07C53E2R"), {value: arrayUnion(10)});
}

async function removeFromArray(db) {
    const data = ({value: 10});
    const res = await updateDoc(doc(db, "usersNfts", "0xBDf761788135C7d7Aa76E6671f63462A07C53E2R"), {value: arrayRemove(2)});
}

async function compareHashes(db, collect, account) {

}

getAccountInfo(db, "usersNfts26", "new").then(data => console.log(data.data()));
getAccountDataHash(db, "usersNfts26", "new")
// write(db, "usersNfts26");


// Initialize Firebase
// const app = initializeApp(firebaseConfig);