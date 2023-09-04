import React, {useEffect} from 'react';
import {db} from "../firebase/initializeDB";
import useFetchFromDb from "./useFetchFromDb";

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


// const firebaseApp = initializeApp({
//     apiKey: "AIzaSyCpOEM5_RxgIyfhSncty9O7oHLpvFUbP20",
//     authDomain: "nftmarketplace226.firebaseapp.com",
//     projectId: "nftmarketplace226",
//     storageBucket: "nftmarketplace226.appspot.com",
//     messagingSenderId: "967979187767",
//     appId: "1:967979187767:web:3191732b97e188c57dc9b2"
// });

const useUserWriteToDb = (account, contract, params, useFetchFromDb, func) => {
    //0xBDf761788135C7d7Aa76E6671f63462A07C53E2C
    //0xA4bf42Fa9384D605e259b68dC17777fBF9885E5F
    const writeTokenToCollectionDB = async (account, contract, params) => {
        if (db && account && contract && params !== undefined || "") {
            const usercollection = collection(db, 'Users');
            const accountDoc = doc(usercollection, account);
            const contractCollection = collection(accountDoc, 'Contracts');
            const contractDoc = doc(contractCollection, contract);
            const tokenIdsCollection = collection(contractDoc, "tokenIds");
            const token = doc(tokenIdsCollection, params?.tokenId);
            try {
                await setDoc(token, {
                    data: {
                        account: params?.account,
                        contract: params?.contract,
                        tokenId: params?.tokenId,
                        name: params?.name,
                        image: params?.image,
                        description: params?.description,
                        type: params?.type,
                        category: params?.category
                    }
                })
                console.log("success");
            } catch (error) {
                console.log(":rocket: ~ file: index.js:17 ~ error:", error);
            }

        } else {
            console.log("you did not enter info");
        }
    }

    const writeUserContractDB = async (account, contract) => {
        if (db && account && contract !== undefined || "") {
            const usersContracts = collection(db, 'UsersContracts');
            const accountDoc = doc(usersContracts, account);
            try {
                await setDoc(accountDoc, {contracts: [contract]}, {merge: true});
            } catch (error) {
                console.log(":rocket: ~ file: index.js:17 ~ error:", error);
            }
        } else {
            console.log("you did not enter info");
        }
    }

    const updateUserContractDB = async (account, contract) => {
        if (db && account && contract !== undefined || "") {
            const usersContracts = collection(db, 'UsersContracts');
            const accountDoc = doc(usersContracts, account);
            try {
                await updateDoc(accountDoc, {contracts: arrayUnion(contract)});
            } catch (error) {
                console.log(":rocket: ~ file: index.js:17 ~ error:", error);
            }
        } else {
            console.log("you did not enter info");
        }
    }

    const writeOrUpdateUserContractDB = async (account, contract, useFetchFromDb) => {
        if ([useFetchFromDb].length > 0) {
            updateUserContractDB(account, contract);
        }
        if (useFetchFromDb === undefined) {
            console.log("!length", useFetchFromDb)
            console.log("=>(useUserWriteToDb.js:98) useFetchFromDb", useFetchFromDb);
            writeUserContractDB(account, contract);
        }
    }
    useEffect(() => {
        console.log("useWrite: ", useFetchFromDb);
    })

    useEffect(() => {
        // if (func === "writeTokenToCollectionDB") writeTokenToCollectionDB(account, contract, params);
        if (func === "writeUserContractDB" && params && useFetchFromDb === undefined || "") writeUserContractDB(account, contract);
        if (func === "updateUserContractDB" && params && useFetchFromDb === undefined || "") updateUserContractDB(account, contract);
        if ((func === "writeOrUpdateUserContractDB" && params === undefined || "")) writeOrUpdateUserContractDB(account, contract, useFetchFromDb);
    }, [func, useFetchFromDb, account, contract])
};

export default useUserWriteToDb;