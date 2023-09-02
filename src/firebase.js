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

async function getTokenInfoFromUsers(db, collect, account, contract, arg) {
    const docRef = doc(db, collect, account, "Contracts", contract, "tokenIds", arg);
    return await getDoc(docRef);
}

async function getCollectionInfoFromUsers(db, collect, account, contract, arg) {
    const querySnapshot = await getDocs(collection(db, collect, account, "Contracts", contract, "tokenIds"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
}

async function updateTokenInfoInUsers(db, collect, account, contract, tokenId, data) {
    await updateDoc(doc(db, collect, account, "Contracts", contract, "tokenIds", tokenId), data);
}

async function writeTokenInfoInUsers(db, account, contract, params) {
    const Usercollection = collection(db, 'Users');
    const accountDoc = doc(Usercollection, account);
    const contractCollection = collection(accountDoc, 'Contracts');
    const contractDoc = doc(contractCollection, contract);
    const tokenIdsCollection = collection(contractDoc, "tokenIds");
    const token = doc(tokenIdsCollection, params?.tokenId);
    await setDoc(token, {
        data: {
            tokenId: params?.tokenId,
            contract: params?.contract,
        }
    })
}

const res = getCollectionInfoFromUsers(db, "Users", "0xBDf761788135C7d7Aa76E6671f63462A07C53E2C", "0xA4bf42Fa9384D605e259b68dC17777fBF9885E5F");

// writeTokenInfoInUsers(db, "0xBDf761788135C7d7Aa76E6671f63462A07C53E2C", "0xA4bf42Fa9384D605e259b68dC17777fBF9885E5F",
//     {tokenId: "3", contract: "0xA4bf42Fa9384D605e259b68dC17777fBF9885E5F"});

// updateTokenInfoInUsers(db, "Users", "0xBDf761788135C7d7Aa76E6671f63462A07C53E2C", "0xA4bf42Fa9384D605e259b68dC17777fBF9885E5F", "2", {
//     data: {
//         tokenId: "2",
//         contract: "0xA4bf42Fa9384D605e259b68dC17777fBF9885E5F"
//     }
// })

// const res = getTokenInfoFromUsers(db, "Users", "0xBDf761788135C7d7Aa76E6671f63462A07C53E2C", "0xA4bf42Fa9384D605e259b68dC17777fBF9885E5F", "1");
// res.then(data => console.log(data.data()));