const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Deploy", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    const [owner, nftOwner, user1, user2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("ApesNft", nftOwner);
    const tokenContract = await Token.deploy();
    await tokenContract.waitForDeployment();

    for (let i = 0; i < 1; i++) {
      await tokenContract.safeMint(user1.address, "https://amber-unhappy-haddock-744.mypinata.cloud/ipfs/QmWeQ4ZiSTWD3cgoDLuFEjydYBexnE1kwksrg4iRqwieCB/1.jpeg");
    }

    const Market = await ethers.getContractFactory("NftMarketplace");
    const marketContract = await Market.deploy();
    await marketContract.waitForDeployment();
    return {tokenContract, nftOwner, owner, user1, user2, marketContract}
  }

  describe("Nft", () => {
    it("should mint 5 nft", async () => {
      const {tokenContract, nftOwner, owner, user1, user2} = await loadFixture(deploy);
      const amount = await tokenContract.balanceOf(user1.address);
      expect(amount).to.eq(1);
    })
    it("return tokenURI", async () => {
      const {tokenContract, nftOwner, owner, user1, user2} = await loadFixture(deploy);
      const amount = await tokenContract.tokenURI(1);
      console.log("=>(Lock.js:38) amount", amount);

      // expect(amount).to.eq(5);
    })
  })

  describe("Market", () => {
    it("should list item", async () => {
      const {tokenContract, marketContract, nftOwner, owner, user1, user2} = await loadFixture(deploy);

    })
  })

});
