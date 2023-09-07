import React, {useContext, useState} from 'react';
import cl from "./Modal.module.css";
import AuthContext from "../context/AuthContext";
import useUserWriteToDb from "../hooks/useUserWriteToDb";
import erc20Abi from "../abis/erc20.json";
import useFetchFromDb from "../hooks/useFetchFromDb";
import useFetchCollection from "../hooks/useFetchCollection";

const Modal = (props) => {

    const {provider, accounts} = useContext(AuthContext);
    const [contract, setContract] = useState("");
    const [category, setCategory] = useState("Art");

    const {contractExistsInDB, getUserContractsList} = useFetchFromDb();

    const {getAllContractsTokensOfUser} = useFetchCollection();

    const {
        writeUserContractDB,
        writeUserKeys,
        success,
        loading,
        error
    } = useUserWriteToDb(contract);
//0xA4bf42Fa9384D605e259b68dC17777fBF9885E5F
    //0xBDf761788135C7d7Aa76E6671f63462A07C53E2C
    async function go(contractAddr, category, event) {
        event.preventDefault();
        console.log("go")
        // writeUserContractDB(accounts, contractAddr, category);
        // contractExistsInDB(accounts, contractAddr)
        // getContractsListFromDB(accounts);
        // getUserContractsList("0xBDf761788135C7d7Aa76E6671f63462A07C53E2C");
        getAllContractsTokensOfUser("5", accounts);
    }
    //TODO deplot PexelNft and mint a few nft's + few ApeNft's
    return (
        <>
            {props.show &&
                <div className={cl.Overlay}>

                    <div className={cl.Modal}>
                        <div className={cl.rectangle} onClick={() => props.setShowModal(false)}></div>
                        <form style={{
                            flexDirection: "column",
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            {error && <p>error</p>}
                            <input onChange={(e) => {
                                setContract(e.target.value)
                            }} style={{padding: "5px", margin: "10px", borderRadius: "10px", width: "50%"}}/>
                            {contract} {category}
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="Art">Art</option>
                                <option value="Gaming">Gaming</option>
                                <option value="Photography">Photography</option>
                            </select>
                            <button onClick={(event) => {
                                go(contract, category, event)
                            }} style={{padding: "5px", margin: "10px", borderRadius: "10px", width: "30%"}}>Upload
                                collection
                            </button>
                        </form>
                    </div>

                </div>
            }

        </>
    );
};

export default Modal;