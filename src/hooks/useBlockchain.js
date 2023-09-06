import React, {useContext, useState} from 'react';
import AuthContext from "../context/AuthContext";

const UseBlockchain = (contractAddress) => {
    const {provider} = useContext(AuthContext);

    const contractExists = async (contractAddress) => {
        try {
            const code = await provider.getCode(contractAddress);
            return code !== '0x';
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return {
        contractExists: contractExists
    }
};

export default UseBlockchain;