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
    query, where,
    arrayRemove
} = require("firebase/firestore");

const UseFetchFromDb = (account, func) => {

    const [data, setData] = useState([]);

    const getContractsListFromDB = async (account) => {
        const docRef = doc(db, "UsersContracts", account);
        console.log("=>(useFetchFromDb.js:28) account", account);
        const data = await getDoc(docRef);
        setData(data.data());
    }


    useEffect(() => {
        if (func === "getContractsListFromDB" && account !== undefined || "") getContractsListFromDB(account);
    }, [func])

    return [data];
};

export default UseFetchFromDb;