const {initializeApp} = require("firebase/app");
const {
    getFirestore,
    collection,
    getDocs,
    doc,
    addDoc,
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

//
export async function getAccountInfo(db, collect, account, contract) {
    const docRef = doc(db, collect, account, contract, "ids");
    return await getDoc(docRef);
}

//
// // async function getAccountDataHash(db, collect, account) {
// //     const querySnapshot = await getDocs(collection(db, collect, account, usersNfts));
// //     querySnapshot.forEach((doc) => {
// //         // doc.data() is never undefined for query doc snapshots
// //         console.log(doc.id, " => ", doc.data());
// //     });
// // }
//
// async function write(db, account, contract) {
//     // const data = {hash: "0xBDf761788135C7d", value: [2, 1]};
//     // // data.hash = hash(data);
//     // const res = await setDoc(doc(db, collect, contract), data);
//
//     await setDoc(doc(db, "userInfo", account), {
//         contract: {
//             name: contract,
//             ids: [1, 4, 65],
//             hash: "gnejrgnk4043390",
//         }
//
//     });
//
// }
//
// async function coL(db) {
//     const collectionRef = collection(db, 'UserInfo');
//     const docRef = doc(collectionRef, "account");
//     const collectionRef1 = collection(docRef, 'Contract');
//     const secondDocRef2 = doc(collectionRef1, "ids");
//     const secondDocRef3 = doc(collectionRef1, "hash");
//     await setDoc(secondDocRef2, {ids: [1, 2, 3]})
//     await setDoc(secondDocRef3, {hash: "dfjhbveurfvg34763847fhu"})
//
// }
//
// // coL(db);
//

async function createdNestedCol() {
    db.collection("newCollect").doc("address").collection("contract").add({
        ids: [1, 2, 3],
        hash: "hfjsbf74yt39hfpi4hfi"
    })
}


// createdNestedCol();
// async function writeCollect(db, account, contract) {
//     // const data = {hash: "0xBDf761788135C7d", value: [2, 1]};
//     // // data.hash = hash(data);
//     // const res = await setDoc(doc(db, collect, contract), data);
//
//     await setDoc(doc(db, "userInfo", account), {
//         contract: {
//             name: contract,
//             ids: [1, 4, 65],
//             hash: "gnejrgnk4043390",
//         }
//
//     });
//
// }
//
// async function update(db, collect, account) {
//     const data = ({
//
//         // name: "gnejrgnk4043395555555550",
//         fam: "12"
//
//     });
//     const res = await updateDoc(doc(db, "userInfo", "0xBDf761788135C7d7Aa76E6671f63462A07C53E2C"), data);
// }
//
// async function updateArray(db) {
//     const data = ({value: 10});
//     const res = await updateDoc(doc(db, "usersNfts", "0xBDf761788135C7d7Aa76E6671f63462A07C53E2R"), {value: arrayUnion(10)});
// }
//
// async function removeFromArray(db) {
//     const data = ({value: 10});
//     const res = await updateDoc(doc(db, "usersNfts", "0xBDf761788135C7d7Aa76E6671f63462A07C53E2R"), {value: arrayRemove(2)});
// }
//
// async function compareHashes(db, collect, account) {
//
// }

// update(db, "userInfo", "0xBDf761788135C7d7Aa76E6671f63462A07C53E2C");
// getAccountDataHash(db, "usersNfts26", "new")
// write(db,  "0xBDf761788135C7d7Aa76E6671f63462A07C53E2C", "0xA4bf42Fa9384D605e259b68dC17777fBF9885E5Z");


// Initialize Firebase
// const app = initializeApp(firebaseConfig);