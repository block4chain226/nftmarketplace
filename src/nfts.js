const axios = require("axios");
require("dotenv").config();

const Auth = Buffer.from(
    process.env.INFURA_API_KEY + ":" + process.env.INFURA_API_KEY_SECRET,
).toString("base64");

const chainId = "5";
const walletAddress = "0x217719Ba3b94bD9F054B23E49cEd95EB1B282101";

 const getContractsInfo = (async (...contracts) => {
    let query = "";
    contracts.forEach((item, index) => query += `tokenAddresses=${item}&`);

    try {
        const {data} = await axios.get(
            `https://nft.api.infura.io/networks/${chainId}/accounts/${walletAddress}/assets/nfts?${query}`,
            {
                headers: {
                    Authorization: `Basic ${Auth}`,
                },
            },
        );
        // console.log(":rocket: ~ file: index.js:20 ~ result:", data.assets);
        return data;


    } catch (error) {
        console.log(":rocket: ~ file: index.js:17 ~ error:", error);
    }
});

const compare = (arr1, arr2) => {
    let newArr, temp, temp1;
    temp = array1.filter(function (el) {
        return arr2.indexOf(el) === -1;
    });
    temp1 = array2.filter(function (el) {
        return arr1.indexOf(el) === -1;
    });
    newArr = temp.concat(temp1);
    return !newArr.length;
}
// const y = getContractsInfo("0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b");
// let tokenIds = [];
// tokenIds = y.then(data => data.assets.map(item => {
//     console.log("dfdfg", item.tokenId)
// }))
// tokenIds.then(data=>console.log(data));
let tokenIds = getContractsInfo("0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b").then(data => Object.entries(data.assets).map((item, index) => {
    return item[1].tokenId;
}))
tokenIds.then((data=>console.log(data)))



