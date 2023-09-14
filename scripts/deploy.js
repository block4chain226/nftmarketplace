// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

    const apeNft = await hre.ethers.deployContract("ApeNft");
    await apeNft.waitForDeployment();
    const market = await hre.ethers.deployContract("NftMarketplace");
    await market.waitForDeployment();
    //0xB1Ce55E2AEA74919e74cE8dF6c15E7543E1Cbff3
    console.log(
        `ApeNft deployed to ${await apeNft.getAddress()}`
    );
    console.log(
        `Market deployed to ${await market.getAddress()}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
