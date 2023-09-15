import React, {useContext, useEffect, useState} from 'react';
import useFetchCollection from "../../../hooks/useFetchCollection";
import AuthContext from "../../../context/AuthContext";
import useUserWriteToDb from "../../../hooks/useUserWriteToDb";
import useFetchFromDb from "../../../hooks/useFetchFromDb";
import Collection from "./Collection";

const Portfolio = () => {
    const {accounts} = useContext(AuthContext);

    const [collections, setCollections] = useState([]);
    const [nftItems, setNftItems] = useState([]);
    const [showItems, setShowItems] = useState(false);
    const [contract, setContract] = useState("");

    const {getAllContractsTokensOfUser, getAllSingleContractTokensOfUser} = useFetchCollection();
    const {getUserContractsList} = useFetchFromDb();


    const getCollectionsData = async (account) => {
        if (account !== undefined || "" || null) {
            const contracts = await getUserContractsList(accounts);
            if (contracts.length > 0) {
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

    }

    useEffect(() => {
        if (accounts !== null || "" || undefined) getCollectionsData(accounts);
    }, [accounts])

    return (
        <div className="row justify-content-center">
            {
                collections && collections.map((item) => (
                        <Collection accounts={accounts} item={item} key={item.collectionName} setContract={setContract}/>
                    )
                )
            }
        </div>
    );
};

export default Portfolio;