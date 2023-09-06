import React, {useContext, useEffect} from "react";
import {createContext} from "react";
import {useState} from "react";
import {Web3Auth} from "@web3auth/modal";
import {CHAIN_NAMESPACES, SafeEventEmitterProvider} from "@web3auth/base";
import {ethers} from "ethers";
import erc20Abi from "../abis/erc20.json";

const AuthContext = createContext();

const clientId = "BH88U3rXLQxiX_zAoGEHCUaP0wBlxC82MB3yvnqDU-EDeKBoH60Y8Il-O8tMzQTGI5fSYTbwGtJEGb-O-NO_OI4";

export const AuthProvider = ({children}) => {
    const [accounts, setAccounts] = useState(null);
    const [web3auth, setWeb3auth] = useState(null);
    const [provider, setProvider] = useState(null);

    const requestAccount = async () => {
        try {
            const web3auth = new Web3Auth({
                clientId,
                web3AuthNetwork: "cyan",
                chainConfig: {
                    chainNamespace: "eip155",
                    chainId: "0x5",
                    rpcTarget: "https://rpc.ankr.com/eth_goerli",
                    displayName: "Goerli Testnet",
                    blockExplorer: "https://goerli.etherscan.io",
                    ticker: "ETH",
                    tickerName: "Ethereum",
                }
            });

            setWeb3auth(web3auth);

            await web3auth.initModal();

            if (web3auth.provider) {
                const web3authProvider = await web3auth.connect();
                const provider = new ethers.BrowserProvider(web3authProvider);
                const signer = await provider.getSigner();

                setAccounts(signer);
                setProvider(provider);
                // console.log("=>(AuthContext.js:43) signer", signer);
               // await contractExists(erc20Abi, signer, "0xA4bf42Fa9384D605e259b68dC17777fBF9885E5F");
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        requestAccount()
    }, [])
    return (
        <AuthContext.Provider
            value={{web3auth, accounts, setAccounts, setWeb3auth, provider, setProvider, requestAccount}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;