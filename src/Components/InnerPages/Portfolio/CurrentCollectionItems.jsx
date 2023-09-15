import React, {useEffect, useState} from 'react';
import SideBar from "../../IndexOne/SideBar";
import Header from "../../Header/Header";
import Banner from "../../Explore/Banner";
import Category from "../../Category/Category";
import Footer from "../../Footer/Footer";
import {useParams} from "react-router-dom";
import useFetchCollection from "../../../hooks/useFetchCollection";
import NftItem from "./NftItem";

const CurrentCollectionItems = () => {
    const {accounts, contract} = useParams();
    const {getAllSingleContractTokensOfUser} = useFetchCollection();
    const [nftItems, setNftItems] = useState([]);
    const [collectionName, setCollectionName] = useState("");

    const getCollectionItemsData = async (accounts, contract) => {
        if (accounts !== undefined || "" && contract !== undefined || "") {
            const nfts = await getAllSingleContractTokensOfUser("5", accounts, contract);
            setCollectionName(nfts[0].collectionName);
            if (nfts.length) {
                setNftItems(nfts);
            }
        }
    }

    useEffect(() => {
        if (accounts !== undefined)
            console.log(accounts, contract)
    }, [])

    useEffect(() => {
        if (contract !== "") getCollectionItemsData(accounts, contract);
    }, [accounts])

    return (
        <>
            <SideBar/>
            <div className="main-content">
                <Header/>
                <main>
                    <Banner title={collectionName && `${collectionName} collection nfts`}/>
                    <Category/>
                    <div className="row justify-content-center">
                        {
                            nftItems.map(item => (
                                <NftItem item={item} key={item.metadata.name}/>
                            ))
                        }
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    )
};

export default CurrentCollectionItems;