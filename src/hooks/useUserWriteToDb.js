import React, {useEffect, useState} from 'react';
import {db} from "../firebase/initializeDB";
import useFetchFromDb from "./useFetchFromDb";
import useBlockchain from "./useBlockchain";

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

const useUserWriteToDb = (account, contract, params, useFetchFromDb, category, func) => {
    //0xBDf761788135C7d7Aa76E6671f63462A07C53E2C
    //0xA4bf42Fa9384D605e259b68dC17777fBF9885E5F

    const [success, setSuccess] = useState("");
    const [error, setError] = useState({error: ""});
    const [loading, setLoading] = useState({loading: false});

    const {contractExists} = useBlockchain(contract);

    const writeUserContractDB = async (account, contract, category, collectionName) => {
        setLoading(true);
        const exist = await contractExists(contract);
        if (!exist) {
            setError("Contract doesn't exist");
        }
        if (exist) {
            if (db && account && contract !== undefined || "") {
                const usersContracts = collection(db, 'UsersContracts');
                const accountDoc = doc(usersContracts, account.address);
                const contractCollection = collection(accountDoc, "Contracts");
                const contractDoc = doc(contractCollection, contract);
                try {
                    await setDoc(contractDoc,
                        {
                            contract: contract,
                            category: category,
                            filter: "all"
                        }
                        , {merge: true});
                } catch (error) {
                    setError({error: "Error on saving contract"});
                    console.log(":rocket: ~ file: index.js:17 ~ error:", error);
                }
            } else {
                setError("You didn't enter contract address");
            }
            writeCollectionNameDB(account, contract, collectionName);
        }
        setLoading({loading: true});
        setSuccess("success");
    }

    const writeCollectionNameDB = async (account, contract, name) => {
        setLoading(true);
        const exist = await contractExists(contract);
        if (!exist) {
            setError("Contract doesn't exist");
        }
        if (exist) {
            if (db && account && name !== undefined || "") {
                const usersContracts = collection(db, 'UsersCollectionsNames');
                const accountDoc = doc(usersContracts, account.address);
                const contractCollection = collection(accountDoc, "Contracts");
                const contractDoc = doc(contractCollection, contract);
                try {
                    await setDoc(contractDoc,
                        {
                            name: name
                        }
                        , {merge: true});
                } catch (error) {
                    setError({error: "Error on saving contract"});
                    console.log(":rocket: ~ file: index.js:17 ~ error:", error);
                }
            } else {
                setError("You didn't enter contract address");
            }
        }
        setLoading({loading: true});
        setSuccess("success");
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
    //TODO need to rewrite DB logic for array with object
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

    return {
        writeUserContractDB: writeUserContractDB,
        writeCollectionNameDB: writeCollectionNameDB,
        success: success,
        loading: loading,
        error: error
    }
};

export default useUserWriteToDb;