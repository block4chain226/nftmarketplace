import React, {createContext, useEffect, useState} from "react";
import {ethers} from "ethers";

const AdminWalletContext = createContext();

export const AdminWalletProvider = ({children}) => {
    const [adminWallet, setAdminWallet] = useState(null);
    const requestAdminAccount = async () => {
        try {
            const provider = new ethers.JsonRpcProvider("https://goerli.infura.io/v3/0278c444aed04da78423cf802ca2efd1");
            const signer = new ethers.Wallet("44dabdde59ac97b99f2e404e0f3ed2c220444e002a403e45e78f6a87723976e0", provider);
            console.log("adminWallet", signer.address);
            setAdminWallet(signer);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        requestAdminAccount();
    }, [])
    return (
        <AdminWalletContext.Provider
            value={{adminWallet}}>
            {children}
        </AdminWalletContext.Provider>
    );
};

export default AdminWalletContext;