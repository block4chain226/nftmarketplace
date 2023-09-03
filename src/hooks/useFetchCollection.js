import React, {useEffect, useState} from 'react';
import axios from "axios";
import {log} from "@web3auth/base";
import {type} from "os-browserify/browser";

const UseFetchCollection = (chainId, wallet, contracts, func) => {

    const [userInfo, setUserInfo] = useState();
    const [contractTokenIds, setContractTokenIds] = useState([]);

    const Auth = Buffer.from("0278c444aed04da78423cf802ca2efd1" + ":" + "332fc3c1362a4778a18c75365d7366fe").toString("base64");

    const getContractsInfo = (async (chainId, wallet, ...contracts) => {
        //5
        //0x217719Ba3b94bD9F054B23E49cEd95EB1B282101
        let query = "";
        contracts.forEach((item) => query += `tokenAddresses=${item}&`);
        let data = {};
        try {
            data = await axios.get(
                `https://nft.api.infura.io/networks/${chainId}/accounts/${wallet}/assets/nfts?${query}`,
                {
                    headers: {
                        Authorization: `Basic ${Auth}`,
                    },
                },
            );

        } catch (error) {
            console.log(":rocket: ~ file: index.js:17 ~ error:", error);
        }
        setUserInfo(data);
    });

    const getContractsTokenIds = (async (chainId, wallet, ...contracts) => {
        let query = "";
        contracts.forEach((item) => query += `tokenAddresses=${item}&`);
        let data = {};
        try {
            data = await axios.get(
                `https://nft.api.infura.io/networks/${chainId}/accounts/${wallet}/assets/nfts?${query}`,
                {
                    headers: {
                        Authorization: `Basic ${Auth}`,
                    },
                },
            );
        } catch (error) {
            console.log(":rocket: ~ file: index.js:17 ~ error:", error);
        }
        const tokenIds = [];
        data.data.assets.forEach((item) => {
            for (let obj in item) {
                if (obj === "tokenId") {
                    tokenIds.push(item[obj]);
                }
            }
        });
        setContractTokenIds(tokenIds);
    })


    // useEffect(() => {
    //     getContractsInfo(chainId, wallet, contracts);
    // }, [])

    useEffect(() => {
        if (func === "getContractsInfo") getContractsInfo(chainId, wallet, contracts);
        if (func === "getContractsTokenIds") getContractsTokenIds(chainId, wallet, contracts);
    }, [func])

    if (userInfo) {
        return [userInfo];
    } else if (contractTokenIds) {
        return [contractTokenIds]
    }

};

export default UseFetchCollection;