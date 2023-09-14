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

    const signTransaction = async (buyer, price, seller, contract, tokenId) => {
        const messageHash = ethers.solidityPackedKeccak256(
            ["address", "uint", "address", "address", "uint"],
            [buyer, price, seller, contract, tokenId]);
        const messageHashBinary = ethers.getBytes(messageHash);
        console.log(adminWallet.address);
        return await adminWallet.signMessage(messageHashBinary);
    }

    return {
        contractExists: contractExists,
        signTransaction: signTransaction
    }
};

export default UseBlockchain;