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
                const docRef = doc(db, "UsersListedTokens", account, "Contracts", contract);
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
        console.log("writeOrUpdateUserListedTokensDB", account, contract, tokenId, getUserContractListedTokens, listingId)
        const data = await getUserContractListedTokens(account, contract);
        if (data !== undefined) {
            await updateUsersListedTokensDB(account, contract, tokenId, listingId)
        }
        if (data === undefined) {
            await writeUsersListedTokensDB(account, contract, tokenId, listingId);
        }
    }

    /////////////////////////////////////////////////////////////////////////UsersListedTokens
    const listTokenDB = async (account, contract, price, tokenId, category, collectionName, image, description, name) => {
        setLoading(true);
        const exist = await contractExists(contract);
        if (!exist) {
            setError("Contract doesn't exist");
        }
        if (exist) {
            if (db && account && contract && tokenId && category && collectionName && name && image && description !== undefined || "" && price > 0) {
                const signedMessage = await signTransaction(price, account.address, contract, tokenId);
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

    ///////////////////////////////////////////////////////////////////ListingsOffers
    //TODO
    const writeListingOffer = async (listingId, account, offerPrice, date, endDate) => {
        setLoading(true);
        if ((db && account && listingId && endDate && date !== "" || undefined || null) && offerPrice && date && endDate > 0) {
            const ListingsOffers = collection(db, 'ListingsOffers');
            const contractDoc = doc(ListingsOffers, listingId)
            try {
                await setDoc(contractDoc,
                    {
                        [account.concat(date)]: {
                            price: offerPrice,
                            account: account,
                            date: date,
                            endDate: endDate
                        },
                        bestOffer: {
                            account: account,
                            bestOffer: offerPrice,
                            endDate: endDate
                        }
                    }
                    , {merge: true});
            } catch (error) {
                setError({error: "Error on saving contract"});
                console.log(":rocket: ~ file: index.js:17 ~ error:", error);
            }
        } else {
            setError("listingId or account or price are empty");
        }

        setLoading({loading: true});
        setSuccess("success");
    }
    //TODO
    const writeUsersOffers = async (listingId, account, offerPrice, seller, date, endDate) => {
        setLoading(true);
        if ((db && account && listingId && endDate && date && seller !== "" || undefined || null) && offerPrice && date && endDate > 0) {
            const UsersOffers = collection(db, 'UsersOffers');
            const contractDoc = doc(UsersOffers, account)
            const Listings = collection(contractDoc, 'Listings');
            const offersDoc = doc(Listings, listingId);
            try {
                await setDoc(offersDoc,
                    {
                        [account.concat(date)]: {
                            price: offerPrice,
                            account: account,
                            seller: seller,
                            date: date,
                            endDate: endDate
                        }
                    }
                    , {merge: true});
            } catch (error) {
                setError({error: "Error on saving contract"});
                console.log(":rocket: ~ file: index.js:17 ~ error:", error);
            }
        } else {
            setError("listingId or account or price are empty");
        }
        setLoading({loading: true});
        setSuccess("success");
    }
    //TODO
    const deleteUserOffer = async (account, listingId, offerId) => {
        setLoading(true);
        if (db && account && offerId !== undefined || "" || null) {
            let arr = [];
            const docRef = doc(db, "UsersOffers", account, "Listings", listingId);
            const offers = (await getDoc(docRef)).data();
            for (let key in offers) {
                if (key === offerId) {
                    delete offers[key];
                } else {
                    arr.push(offers[key]);
                }
            }
            if (arr.length) {
                try {
                    await setDoc(docRef,
                        {
                            ...offers,
                        });
                } catch (error) {
                    setError({error: "Error on saving contract"});
                    console.log(":rocket: ~ file: index.js:17 ~ error:", error);
                }
            } else {
                try {
                    const ListingOffers = doc(db, "UsersOffers", account, "Listings", listingId);
                    await deleteDoc(ListingOffers);
                    await deleteUsersListingsIds(account, listingId);
                } catch (error) {
                    setError({error: "Error on saving contract"});
                    console.log(":rocket: ~ file: index.js:17 ~ error:", error);
                }
            }
        } else {
            setError("You didn't enter offerId");
        }
        setLoading({loading: true});
        setSuccess("success");
    }
    //TODO
    const deleteListingOffer = async (listingId, offerId, listingOffers) => {
        setLoading(true);
        if (db && listingId && offerId && listingOffers !== undefined || "" || null) {
            let listingOffers1 = listingOffers;
            let arr = [];
            let offerToDelete;
            for (let listing in listingOffers1) {
                if (listing === offerId) {
                    offerToDelete = listing;
                    delete listingOffers1[listing];
                } else {
                    arr.push(listingOffers1[listing]);
                }
            }
            if (arr.length) {
                const sortedArr = arr.sort((a, b) => {
                    return a.price - b.price
                });
                console.log("=>(useUserWriteToDb.js:339) sortedArr", sortedArr);
                const account = sortedArr[sortedArr.length - 1].account;
                const bestOffer = sortedArr[sortedArr.length - 1].price;
                const endDate = sortedArr[sortedArr.length - 1].endDate;
                const ListingsOffers = collection(db, 'ListingsOffers');
                const contractDoc = doc(ListingsOffers, listingId)
                try {
                    await setDoc(contractDoc,
                        {
                            ...listingOffers1,
                            bestOffer: {
                                account: account,
                                bestOffer: bestOffer,
                                endDate: endDate,
                            }
                        });

                } catch (error) {
                    setError({error: "Error on saving contract"});
                    console.log(":rocket: ~ file: index.js:17 ~ error:", error);
                }
                return offerToDelete;
            } else {
                try {
                    const ListingsOffers = doc(db, 'ListingsOffers', listingId);
                    await deleteDoc(ListingsOffers);
                } catch (error) {
                    setError({error: "Error on saving contract"});
                    console.log(":rocket: ~ file: index.js:17 ~ error:", error);
                }
                return offerToDelete;
            }
        } else {
            setError("You didn't enter listingId");
        }
        setLoading({loading: true});
        setSuccess("success");
    }
    ///////////////////////////////////////////////////////////////////////////////UsersListingIds
    //TODO
    const writeUsersListingIds = async (account, listingId) => {
        setLoading(true);
        if (db && account && listingId !== "" || undefined || null) {
            const UsersListingsIds = collection(db, 'UsersListingsIds');
            const contractDoc = doc(UsersListingsIds, account)
            try {
                await setDoc(contractDoc,
                    {
                        [listingId]: listingId,
                    }
                    , {merge: true});
            } catch (error) {
                setError({error: "Error on saving contract"});
                console.log(":rocket: ~ file: index.js:17 ~ error:", error);
            }
        } else {
            setError("listingId or account or price are empty");
        }
        setLoading({loading: true});
        setSuccess("success");
    }
    //TODO
    const deleteUsersListingsIds = async (account, listingId) => {
        setLoading(true);
        if (db && account && listingId !== undefined || "" || null) {
            let arr = [];
            const docRef = collection(db, "UsersListingsIds");
            const contractDoc = doc(docRef, account)
            let listingIds = await getDoc(contractDoc);
            listingIds = listingIds.data();
            console.log(listingIds);
            for (let listing in listingIds) {
                if (listing === listingId) {
                    delete listingIds[listing];
                }
            }
            console.log(listingIds);
            try {
                await setDoc(contractDoc,
                    {
                        ...listingIds,
                    });
            } catch (error) {
                setError({error: "Error on saving contract"});
                console.log(":rocket: ~ file: index.js:17 ~ error:", error);
            }
        } else {
            setError("You didn't enter offerId");
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
        writeListingOffer: writeListingOffer,
        writeUsersOffers: writeUsersOffers,
        deleteListingOffer: deleteListingOffer,
        deleteUserOffer: deleteUserOffer,
        writeUsersListingIds: writeUsersListingIds,
        deleteUsersListingsIds: deleteUsersListingsIds,
        success: success,
        loading: loading,
        error: error
    }
};

export default useUserWriteToDb;