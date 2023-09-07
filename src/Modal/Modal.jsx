import React, {useContext, useState} from 'react';
import cl from "./Modal.module.css";
import useFetchCollection from "../hooks/useFetchCollection";
import AuthContext from "../context/AuthContext";

const Modal = (props) => {

    const [contract, setContract] = useState("");
    const [category, setCategory] = useState("Art");
    const {accounts} = useContext(AuthContext);

    const {getAllContractsTokensOfUser} = useFetchCollection();

    const test = async (contract, e) => {
        e.preventDefault();
        getAllContractsTokensOfUser("5", accounts);
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
                            <span>{category && category}</span>
                            <input onChange={(e) => {
                            }} style={{padding: "5px", margin: "10px", borderRadius: "10px", width: "50%"}}/>
                            <select onChange={(e) => {
                                setCategory(e.target.value)
                            }} defaultValue={category}>
                                <option value="Art">Art</option>
                                <option value="Gaming">Gaming</option>
                                <option value="Photography">Photography</option>
                            </select>
                            <button onClick={(e) => {
                                test(contract, e)
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