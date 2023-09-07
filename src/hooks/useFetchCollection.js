import React, {useState} from 'react';
import axios from "axios";
import useFetchFromDb from "./useFetchFromDb";
import _ from "lodash";

const UseFetchCollection = (chainId, wallet, contracts, func) => {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const Auth = Buffer.from("0278c444aed04da78423cf802ca2efd1" + ":" + "332fc3c1362a4778a18c75365d7366fe").toString("base64");

    const {getUserContractListWithCategories} = useFetchFromDb();

    const getAllContractsTokensOfUser = async (chainId, wallet) => {
        if (wallet !== "" || undefined && chainId !== "" || undefined) {
            setLoading(true);
            const allUserContractsWithCategories = await getUserContractListWithCategories(wallet.address);
            let query = "";
            allUserContractsWithCategories.forEach((item) => query += `tokenAddresses=${item.contract}&`);
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
                const sortedAssets = assets.sort((a, b) => a.contract > b.contract ? 1 : -1)
                // add category to assets
                return sortedAssets.map((item, index) => {
                    const obj = {...item};
                    const res = _.isEqual(obj.contract.toUpperCase(), allUserContractsWithCategories[1].contract.toUpperCase());
                    allUserContractsWithCategories.forEach(item => {
                        if (_.isEqual(item.contract.toUpperCase(), obj.contract.toUpperCase())) {
                            obj.category = item.category;
                            obj.collectionName = item.collectionName;
                        }
                    });
                    return obj;
                });
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