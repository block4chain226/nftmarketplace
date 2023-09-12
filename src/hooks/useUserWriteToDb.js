import React, {useState} from 'react';
import {db} from "../firebase/initializeDB";
import useBlockchain from "./useBlockchain";

const {
    getFirestore,
    collection,
    getDocs,
    doc,
    addDoc,
    arrayUnion,
    updateDoc,
    deleteField,
    deleteDoc,
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

    const {contractExists, signTransaction} = useBlockchain();

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
                            collectionName: collectionName,
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
        }
        setLoading({loading: true});
        setSuccess("success");
    }
    //TODO
    const writeOrUpdateUserContractDB = async (account, contract, useFetchFromDb) => {
        if ([useFetchFromDb].length > 0) {
            // updateUserContractDB(account, contract);
        }
        if (useFetchFromDb === undefined) {
            writeUserContractDB(account, contract);
        }
    }

    ///////////////////////////////////////////////////////////////////////// UsersListedTokens
    //TODO
    const updateUsersListedTokensDB = async (account, contract, tokenId, listingId) => {
        setLoading(true);
        const exist = await contractExists(contract);
        if (!exist) {
            setError("Contract doesn't exist");
        }
        if (exist) {
            if (db && account && contract && tokenId !== undefined || "") {
                const UsersListedTokens = collection(db, 'UsersListedTokens');
                const accountDoc = doc(UsersListedTokens, account.address);
                const contractCollection = collection(accountDoc, "Contracts");
                const contractDoc = doc(contractCollection, contract);
                try {
                    await updateDoc(contractDoc,
                        {
                            tokens: arrayUnion(tokenId)
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
    //TODO
    const writeUsersListedTokensDB = async (account, contract, tokenId, listingId) => {
        setLoading(true);
        const exist = await contractExists(contract);
        if (!exist) {
            setError("Contract doesn't exist");
        }
        if (exist) {
            if (db && account && contract && tokenId !== undefined || "") {
                const UsersListedTokens = collection(db, 'UsersListedTokens');
                const accountDoc = doc(UsersListedTokens, account.address);
                const contractCollection = collection(accountDoc, "Contracts");
                const contractDoc = doc(contractCollection, contract);
                try {
                    await setDoc(contractDoc,
                        {
                            tokens: [tokenId],
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

    const deleteUserListedTokenDB = async (account, contract, tokenId) => {
        setLoading(true);
        const exist = await contractExists(contract);
        if (!exist) {
            setError("Contract doesn't exist");
        }
        if (exist) {
            if (db && account && contract && tokenId !== undefined || "") {
                const docRef = doc(db, "UsersListedTokens", account.address, "Contracts", contract);
                try {
                    await updateDoc(docRef,
                        {
                            tokens: arrayRemove(tokenId),
                        });
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
    //TODO
    const writeOrUpdateUserListedTokensDB = async (account, contract, tokenId, getUserContractListedTokens, listingId) => {
        const data = await getUserContractListedTokens(account, contract);
        if (data !== undefined) {
            await updateUsersListedTokensDB(account, contract, tokenId, listingId)
        }
        if (data === undefined) {
            await writeUsersListedTokensDB(account, contract, tokenId, listingId);
        }
    }
    //TODO do UsersListings the same way as writeOrUpdateUserListedTokensDB, delete listing from DB if unlist
    ///////////////////////////////////////////////////////////////////////// UsersListedTokens
    const listTokenDB = async (account, contract, price, tokenId, category, collectionName, image, description, name) => {
        setLoading(true);
        const exist = await contractExists(contract);
        if (!exist) {
            setError("Contract doesn't exist");
        }
        if (exist) {
            if (db && account && contract && tokenId && category && collectionName && name && image && description !== undefined || "" && price > 0) {
                const signedMessage = await signTransaction(account.address, contract, price, tokenId);
                const listingId = (account.address).concat(contract, tokenId);
                const UsersListings = collection(db, 'UsersListings');
                const contractDoc = doc(UsersListings, listingId)
                try {
                    await setDoc(contractDoc,
                        {
                            listing: {
                                seller: account.address,
                                token: contract,
                                tokenId: tokenId,
                                price: price,
                                signedMessage: signedMessage,
                                listingId: listingId,
                                category: category,
                                collectionName: collectionName,
                                name: name,
                                image: image,
                                description: description
                            }
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
    //TODO
    const unListTokenDB = async (listingId) => {
        setLoading(true);
        const exist = await contractExists(contract);
        if (!exist) {
            setError("Contract doesn't exist");
        }
        if (db && listingId !== undefined || "") {
            const UsersListings = collection(db, 'UsersListings');
            const contractDoc = doc(UsersListings, listingId);
            try {
                await deleteDoc(contractDoc);
            } catch (error) {
                setError({error: "Error on saving contract"});
                console.log(":rocket: ~ file: index.js:17 ~ error:", error);
            }
        } else {
            setError("You didn't enter contract address");
        }

        setLoading({loading: true});
        setSuccess("success");
    }


    return {
        writeUserContractDB: writeUserContractDB,
        writeUsersListedTokensDB: writeUsersListedTokensDB,
        deleteUserListedTokenDB: deleteUserListedTokenDB,
        writeOrUpdateUserListedTokensDB: writeOrUpdateUserListedTokensDB,
        listTokenDB: listTokenDB,
        unListTokenDB: unListTokenDB,
        success: success,
        loading: loading,
        error: error
    }
};

export default useUserWriteToDb;