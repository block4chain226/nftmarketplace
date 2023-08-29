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

        for (let i = 0; i < 5; i++) {
            await tokenContract.safeMint(user1.address, "https://amber-unhappy-haddock-744.mypinata.cloud/ipfs/QmWeQ4ZiSTWD3cgoDLuFEjydYBexnE1kwksrg4iRqwieCB/1.jpeg");
        }

        const Market = await ethers.getContractFactory("NftMarketplace");
        const marketContract = await Market.deploy();
        await marketContract.waitForDeployment();
        await tokenContract.connect(user1).setApprovalForAll(marketContract.getAddress(), true);
        return {tokenContract, nftOwner, owner, user1, user2, marketContract}
    }

    describe("Nft", () => {
        it("should mint 5 nft", async () => {
            const {tokenContract, nftOwner, owner, user1, user2} = await loadFixture(deploy);
            const amount = await tokenContract.balanceOf(user1.address);
            expect(amount).to.eq(5);
        })
        it("return tokenURI", async () => {
            const {tokenContract, nftOwner, owner, user1, user2} = await loadFixture(deploy);
            const tokenURI = await tokenContract.tokenURI(1);
            expect(tokenURI).to.not.eq("" || null);
        })
    })

    describe("Market", () => {
        describe("listItem", () => {
            it("should list item", async () => {
                const {tokenContract, marketContract, nftOwner, owner, user1, user2} = await loadFixture(deploy);
                await marketContract.connect(user1).listItem(tokenContract.getAddress(), 1, ethers.parseEther("0.1"), {value: ethers.parseUnits("1000", "wei")});
                const listedItem = await marketContract.getListing(tokenContract.getAddress(), 1);
                expect(listedItem).to.not.eq(null);
                await expect(marketContract.connect(user1).listItem(tokenContract.getAddress(), 1, ethers.parseEther("0.1"), {value: ethers.parseUnits("1000", "wei")})).to.be.reverted;
                await expect(marketContract.connect(user1).listItem(tokenContract.getAddress(), 2, ethers.parseEther("0"), {value: ethers.parseUnits("1000", "wei")})).to.be.revertedWith("_price == 0");
            })
        })

        describe("batchListing", () => {
            it("should list batch items", async () => {
                const {tokenContract, marketContract, nftOwner, owner, user1, user2} = await loadFixture(deploy);
                await expect(marketContract.connect(user1).batchListing(tokenContract.getAddress(), [1, 2, 3], [ethers.parseEther("0.1"), ethers.parseEther("0.2"), ethers.parseEther("0")], {value: ethers.parseUnits("1000", "wei")})
                ).to.be.revertedWith("price must be more than 0");
                await marketContract.connect(user1).batchListing(tokenContract.getAddress(), [1, 2, 3], [ethers.parseEther("0.1"), ethers.parseEther("0.2"), ethers.parseEther("0.3")], {value: ethers.parseUnits("1000", "wei")});
                const listedItem1 = await marketContract.getListing(tokenContract.getAddress(), 1);
                const listedItem2 = await marketContract.getListing(tokenContract.getAddress(), 2);
                const listedItem3 = await marketContract.getListing(tokenContract.getAddress(), 3);
                expect(listedItem1[0] !== '0x0000000000000000000000000000000000000000' &&
                    listedItem1[0] !== 0n && listedItem2[0] !== '0x0000000000000000000000000000000000000000' &&
                    listedItem2[0] !== 0n && listedItem3[0] !== '0x0000000000000000000000000000000000000000' &&
                    listedItem3[0] !== 0n).to.eq(true);
            })
        })

        describe("cancelListing", () => {
            it("should list batch items", async () => {
                const {tokenContract, marketContract, nftOwner, owner, user1, user2} = await loadFixture(deploy);
                await marketContract.connect(user1).listItem(tokenContract.getAddress(), 1, ethers.parseEther("0.1"), {value: ethers.parseUnits("1000", "wei")});
                await expect(marketContract.connect(user1).cancelListing(tokenContract.getAddress(), 2)).to.be.revertedWith("wasn't listed");
                const listedItem1 = await marketContract.connect(user1).getListing(tokenContract.getAddress(), 1);
                expect(listedItem1[0] !== '0x0000000000000000000000000000000000000000' &&
                    listedItem1[0] !== 0n).to.eq(true);
            })
        })

        describe("updateListing", () => {
            it("should list batch items", async () => {
                const {tokenContract, marketContract, nftOwner, owner, user1, user2} = await loadFixture(deploy);
                await marketContract.connect(user1).listItem(tokenContract.getAddress(), 1, ethers.parseEther("0.1"), {value: ethers.parseUnits("1000", "wei")});
                await expect(marketContract.connect(user2).updateListing(tokenContract.getAddress(), 1, ethers.parseEther("0.2"))).to.be.revertedWith("you are not owner of the nft");
                await expect(marketContract.connect(user1).updateListing(tokenContract.getAddress(), 1, ethers.parseEther("0"))).to.be.revertedWith("new price = 0");
                const result = await marketContract.connect(user1).updateListing(tokenContract.getAddress(), 1, ethers.parseEther("0.5"));
                const listedItem1 = await marketContract.connect(user1).getListing(tokenContract.getAddress(), 1);
                expect(listedItem1[1]).to.eq(ethers.parseEther("0.5"));
            })
        })

        describe("buyItem", () => {
            it("should list batch items", async () => {
                const {tokenContract, marketContract, nftOwner, owner, user1, user2} = await loadFixture(deploy);
                await marketContract.connect(user1).listItem(tokenContract.getAddress(), 1, ethers.parseEther("0.1"), {value: ethers.parseUnits("1000", "wei")});
                const nftPrice = await marketContract.getListing(tokenContract.getAddress(), 1);
                const cost = nftPrice[1] + ethers.parseUnits("1000", "wei");
                const amount = await tokenContract.balanceOf(user2.address);
                const sellerIncomeBefore = await marketContract.getUserProceeds(user1.address);
                const result = await marketContract.connect(user2).buyItem(tokenContract.getAddress(), 1, {value: ethers.parseUnits(cost.toString(), "wei")});
                const sellerIncomeAfter = await marketContract.getUserProceeds(user1.address);
                expect(sellerIncomeAfter > sellerIncomeBefore).to.eq(true);
                await expect(result).to.changeEtherBalance(marketContract, ethers.parseUnits(cost.toString(), "wei"));
                await expect(result).to.changeEtherBalance(user2, -ethers.parseUnits(cost.toString(), "wei"));
                const amount1 = await tokenContract.balanceOf(user2.address);
                expect(amount1 > amount).to.eq(true);
            })
        })

        describe("withdrawProceeds", () => {
            it("should list batch items", async () => {
                const {tokenContract, marketContract, nftOwner, owner, user1, user2} = await loadFixture(deploy);
                await marketContract.connect(user1).listItem(tokenContract.getAddress(), 1, ethers.parseEther("0.1"), {value: ethers.parseUnits("1000", "wei")});
                const nftPrice = await marketContract.getListing(tokenContract.getAddress(), 1);
                const cost = nftPrice[1] + ethers.parseUnits("1000", "wei");
                const result = await marketContract.connect(user2).buyItem(tokenContract.getAddress(), 1, {value: ethers.parseUnits(cost.toString(), "wei")});
                const proceedsBalance = await marketContract.getUserProceeds(user1.address);
                const proceeds = await marketContract.connect(user1).withdrawProceeds({value: ethers.parseUnits("1000", "wei")});
                await expect(proceeds).to.changeEtherBalance(user1, proceedsBalance - ethers.parseUnits("1000", "wei"));
                await expect(proceeds).to.changeEtherBalance(marketContract, -proceedsBalance + ethers.parseUnits("1000", "wei"));
            })
        })
    })

});
