import React, {useEffect, useState} from 'react';
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

    const getContractsListFromDB = async (account) => {
        const docRef = doc(db, "UsersContracts", account, "Contracts", "category");
        const data = await getDoc(docRef);
        const dat = data.data();

        console.log("=>(useFetchFromDb.js:25) data", await data.data());
        // let arr = [];
        // for (let key in dat) {
        //     // arr.push(Object.values(dat[key]));
        //     arr = Object.entries(dat[key]).map(item => item[1])
        // }
        // console.log(arr)

        setData(data.data());
    }

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
            console.log(doc.id)
            contracts.push(doc.id);
        });
        return contracts;
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

    //TODO delete
    const getAllUserContracts = async (account, contract) => {
        console.log("contract: ", contract);
        const q = query(collection(db, "UsersContracts"), where("contract", "==", contract));
        const querySnapshot = await getDocs(q);
    }

    return {
        contractExistsInDB: contractExistsInDB,
        getContractsListFromDB: getContractsListFromDB,
        getUserContractsList: getUserContractsList,
        getUserContractListWithCategories: getUserContractListWithCategories
    };
};

export default UseFetchFromDb;