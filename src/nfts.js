const axios = require("axios");
require("dotenv").config();

const Auth = Buffer.from(
    process.env.INFURA_API_KEY + ":" + process.env.INFURA_API_KEY_SECRET,
).toString("base64");

const chainId = "5";
const walletAddress = "0x217719Ba3b94bD9F054B23E49cEd95EB1B282101";

const getContractsInfo = (async (...contracts) => {
    let query;
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
        console.log(":rocket: ~ file: index.js:20 ~ result:", data.assets.filter(item => item.tokenId < 73889243904509611474688124910479078512340374220987978095039703176887973404038));

    } catch (error) {
        console.log(":rocket: ~ file: index.js:17 ~ error:", error);
    }
});
getContractsInfo("0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b", "0xad46d0235b2698aad03803443b7a50383bdefc1c");