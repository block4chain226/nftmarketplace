import React, {useState} from 'react';
import {db} from "../firebase/initializeDB";

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
    CollectionReference,
    query, where,
    arrayRemove
} = require("firebase/firestore");

const UseFetchFromDb = (account, func) => {

    const [data, setData] = useState([]);

    //TODO
    const contractExistsInDB = async (account, contract) => {
        console.log("contract: ", contract);
        const q = query(collection(db, "UsersContracts", account, "Contracts"), where("contract", "==", contract));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    }
    //TODO
    const getUserContractsList = async (account) => {
        const q = query(collection(db, "UsersContracts", account.address, "Contracts"), where("filter", "==", "all"));
        const querySnapshot = await getDocs(q);
        let contracts = [];
        querySnapshot.forEach((doc) => {
            contracts.push(doc.id);
        });
        return contracts;
    }
    //TODO
    const getUserContractListedTokens = async (account, contract) => {
        const docRef = doc(db, "UsersListedTokens", account.address, "Contracts", contract);
        const allContractListedTokens = await getDoc(docRef);
        console.log("=>(useFetchFromDb.js:46) allContractListedTokens", allContractListedTokens.data());
        return allContractListedTokens.data();
    }
    //TODO
    const getUserContractListWithCategories = async (account) => {
        const q = query(collection(db, "UsersContracts", account, "Contracts"), where("filter", "==", "all"));
        const querySnapshot = await getDocs(q);
        let contractListWithCategories = [];
        querySnapshot.forEach((doc) => {
            contractListWithCategories.push(doc.data());
        });
        contractListWithCategories = contractListWithCategories.map(item => {
            const obj = {...item};
            delete obj["filter"];
            return obj;
        });
        return contractListWithCategories;
    }

    return {
        contractExistsInDB: contractExistsInDB,
        getUserContractsList: getUserContractsList,
        getUserContractListedTokens: getUserContractListedTokens,
        getUserContractListWithCategories: getUserContractListWithCategories
    };
};

export default UseFetchFromDb;