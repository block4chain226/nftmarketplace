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
    const getHash = async () => {
        const q = query(collection(db, "UsersListings"), where("0xBDf761788135C7d7Aa76E6671f63462A07C53E2C0xFF2.contract"
            , "==",
            "0xFF"));
        const querySnapshot = await getDocs(q);
        let contracts = [];
        querySnapshot.forEach((doc) => {
            console.log("getHash", doc.id, "=>", doc.data());
        });
        return contracts;
    }
    //TODO
    const getUserContractListedTokens = async (account, contract) => {
        const docRef = doc(db, "UsersListedTokens", account.address, "Contracts", contract);
        const allContractListedTokens = await getDoc(docRef);
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
        getUserContractListWithCategories: getUserContractListWithCategories,
        getHash: getHash
    };
};

export default UseFetchFromDb;