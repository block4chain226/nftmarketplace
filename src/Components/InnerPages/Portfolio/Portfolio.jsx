import React, {useContext, useEffect, useState} from 'react';
import useFetchCollection from "../../../hooks/useFetchCollection";
import AuthContext from "../../../context/AuthContext";
import useUserWriteToDb from "../../../hooks/useUserWriteToDb";
import useFetchFromDb from "../../../hooks/useFetchFromDb";
import Collection from "./Collection";
import NftItem from "./NftItem";

const Portfolio = () => {
    const {accounts} = useContext(AuthContext);

    const [collections, setCollections] = useState([]);
    const [nftItems, setNftItems] = useState([]);
    const [showItems, setShowItems] = useState(false);
    const [contract, setContract] = useState("");

    const {getAllContractsTokensOfUser, getAllSingleContractTokensOfUser} = useFetchCollection();
    const {writeUserContractDB} = useUserWriteToDb();
    const {getUserContractsList} = useFetchFromDb();
    const {getAllListings} = useFetchFromDb();


    const getCollectionsData = async (account) => {
        if (account !== undefined || "") {
            const contracts = await getUserContractsList(accounts);
            const allTokens = await getAllContractsTokensOfUser("5", account);
            let lastContract;
            for (let i = 0; i < allTokens.length; i++) {
                if (i === 0) {
                    lastContract = allTokens[i].contract;
                    continue;
                }
                if (allTokens[i].contract === lastContract) {
                    allTokens.splice(i, 1);
                    i--;
                }
                if (allTokens[i].contract !== lastContract) {
                    lastContract = allTokens[i].contract
                }
            }
            setCollections(allTokens);
        }

    }

    const getCollectionItemsData = async (account, contract) => {
        if (account !== undefined || "" && contract !== undefined || "") {
            const nfts = await getAllSingleContractTokensOfUser("5", account, contract);
            console.log("=>(Portfolio.jsx:50) nfts", nfts);
            //TODO check if listing exists
            if (nfts.length) {
                setNftItems(nfts);
            }
        }
    }

    useEffect(() => {
        if (accounts !== null) getCollectionsData(accounts);
    }, [accounts])

    useEffect(() => {
        if (contract !== "") getCollectionItemsData(accounts, contract);
    }, [contract])

    useEffect(() => {
        if (nftItems.length) setShowItems(true)
    }, [nftItems])

    return (
        <div className="row justify-content-center">
            {
                !showItems ? collections.map((item) => (
                            <Collection item={item} key={item.collectionName} setContract={setContract}/>
                        )
                    ) :
                    nftItems.map((item) => (
                        <NftItem item={item} key={item.metadata.name}/>
                    ))
            }
        </div>
    );
};

export default Portfolio;