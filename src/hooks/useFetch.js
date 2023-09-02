import React, { useEffect, useState } from 'react';
import axios from "axios";

const UseFetch = (chainId, wallet, contracts) => {

    const [userInfo, setUserInfo] = useState();

    const Auth = Buffer.from("0278c444aed04da78423cf802ca2efd1" + ":" + "332fc3c1362a4778a18c75365d7366fe").toString("base64");

    const getContractsInfo = (async (chainId, wallet, ...contracts) => {
        //5
        //0x217719Ba3b94bD9F054B23E49cEd95EB1B282101
        let query = "";
        contracts.forEach((item) => query += `tokenAddresses=${item}&`);
        console.log(query)
        try {
            const {data} = await axios.get(
                `https://nft.api.infura.io/networks/${chainId}/accounts/${wallet}/assets/nfts?${query}`,
                {
                    headers: {
                        Authorization: `Basic ${Auth}`,
                    },
                },
            );
            console.log(":rocket: ~ file: index.js:20 ~ result:", data.assets);
            setUserInfo(data);
        } catch (error) {
            console.log(":rocket: ~ file: index.js:17 ~ error:", error);
        }
    });

    function getData(data) {
        const obj = {};
        obj.account = data.account;
        obj.assets = data.assets;

        console.log(data.assets?.[0])
        console.log(data.assets?.[1])
    }

    useEffect(() => {
        getContractsInfo(chainId, wallet, contracts);
    }, [])

    useEffect(() => {
        if (userInfo) getData(userInfo);
    }, [userInfo])

    return [userInfo];
};

export default UseFetch;