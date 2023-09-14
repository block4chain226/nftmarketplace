import React, {useContext} from 'react';
import AuthContext from "../context/AuthContext";
import {ethers} from "ethers";
import adminWalletContext from "../context/AdminWalletContext";

const UseBlockchain = () => {
    const {provider} = useContext(AuthContext);
    const {adminWallet} = useContext(adminWalletContext);

    const contractExists = async (contractAddress) => {
        try {
            const code = await provider.getCode(contractAddress);
            return code !== '0x';
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const signTransaction = async (price, seller, contract, tokenId) => {
        const messageHash = ethers.solidityPackedKeccak256(
            ["uint", "address", "address", "uint"],
            [price, seller, contract, tokenId]);
        const messageHashBinary = ethers.getBytes(messageHash);
        console.log(adminWallet.address);
        return await adminWallet.signMessage(messageHashBinary);
    }

    const signBuyTransaction = async (buyer, price, seller, contract, tokenId) => {
        const messageHash = ethers.solidityPackedKeccak256(
            ["address", "uint", "address", "address", "uint"],
            [buyer.address, price, seller, contract, tokenId]);
        const messageHashBinary = ethers.getBytes(messageHash);
        return await adminWallet.signMessage(messageHashBinary);
    }
    //0x0b7451A9727820b219097eD8F59e78b11c4233eE
    //0xBDf761788135C7d7Aa76E6671f63462A07C53E2C

    return {
        contractExists: contractExists,
        signTransaction: signTransaction,
        signBuyTransaction: signBuyTransaction
    }
};

export default UseBlockchain;