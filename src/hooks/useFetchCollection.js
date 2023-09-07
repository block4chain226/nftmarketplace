import React, {useEffect, useState} from 'react';
import axios from "axios";
import {log} from "@web3auth/base";
import {type} from "os-browserify/browser";
import useFetchFromDb from "./useFetchFromDb";

const UseFetchCollection = (chainId, wallet, contracts, func) => {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const Auth = Buffer.from("0278c444aed04da78423cf802ca2efd1" + ":" + "332fc3c1362a4778a18c75365d7366fe").toString("base64");

    const {getUserContractListWithCategories} = useFetchFromDb();

    //TODO getAllContractTokensOfUser should be called by outlet function which  pass here  wallet and contract with category
    const getAllContractsTokensOfUser = async (chainId, wallet) => {

        if (wallet !== "" || undefined && chainId !== "" || undefined) {
            console.log("=>(useFetchCollection.js:19) wallet", wallet);
            setLoading(true);
            const allUserContractsWithCategories = await getUserContractListWithCategories(wallet.address);
            console.log("=>(useFetchCollection.js:62) allUserContracts", allUserContractsWithCategories);
            let query = "";

            allUserContractsWithCategories.forEach((item) => query += `tokenAddresses=${item.contract}&`);
            console.log("=>(useFetchCollection.js:63) query", query);
            let data = [];
            try {
                data = await axios.get(
                    `https://nft.api.infura.io/networks/${chainId}/accounts/${wallet.address}/assets/nfts?${query}`,
                    {
                        headers: {
                            Authorization: `Basic ${Auth}`,
                        },
                    },
                );
                const assets = data.data.assets;
                console.log("=>(useFetchCollection.js:79) assets", data);
                // add category to assets
                const assetsWithCategory = assets.map((item, index) => {
                    const obj = {...item};
                    obj.category = allUserContractsWithCategories[index].category;
                    return obj;
                })
                console.log("=>(useFetchCollection.js:85) assetsWithCategory", assetsWithCategory);
                return assetsWithCategory;
            } catch (error) {
                setError("Error on fetching contract");
                console.log(":rocket: ~ file: index.js:17 ~ error:", error);
            }
        } else {
            console.log("no account");
        }
    }

    return {
        getAllContractsTokensOfUser: getAllContractsTokensOfUser,
        loading: loading,
        success: success,
        error: error
    }

};

export default UseFetchCollection;