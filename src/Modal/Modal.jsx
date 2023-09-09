import React, {useContext, useState} from 'react';
import cl from "./Modal.module.css";
import useFetchCollection from "../hooks/useFetchCollection";
import AuthContext from "../context/AuthContext";
import useUserWriteToDb from "../hooks/useUserWriteToDb";

const Modal = (props) => {

    const [contract, setContract] = useState("");
    const [collectionName, setCollectionName] = useState("");
    const [category, setCategory] = useState("Art");
    const {accounts} = useContext(AuthContext);

    const {getAllContractsTokensOfUser} = useFetchCollection();
    const {writeUserContractDB} = useUserWriteToDb();

    const test = async (contract, category, name, e) => {
        e.preventDefault();
        // getAllContractsTokensOfUser("5", accounts);
        writeUserContractDB(accounts, contract, category, name);
    }
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
                            <input onChange={(e) => {
                                setContract(e.target.value)
                            }} style={{padding: "5px", margin: "10px", borderRadius: "10px", width: "50%"}}/>
                            <input onChange={(e) => {
                                setCollectionName(e.target.value)
                            }} style={{
                                padding: "5px", margin: "10px", borderRadius: "10px", width: "50%"
                            }}/>
                            < select onChange={(e) => {
                                setCategory(e.target.value)
                            }} defaultValue={category}>
                                <option value="Art">Art</option>
                                <option value="Gaming">Gaming</option>
                                <option value="Photography">Photography</option>
                            </select>
                            <button onClick={(e) => {
                                test(contract, category, collectionName, e)
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