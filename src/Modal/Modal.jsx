import React, {useState} from 'react';
import cl from "./Modal.module.css";

const Modal = (props) => {
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
                            <input style={{padding: "5px", margin: "10px", borderRadius: "10px", width: "50%"}}/>
                            <select defaultValue={"Art"}>
                                <option value="Art">Art</option>
                                <option value="Gaming">Gaming</option>
                                <option value="Photography">Photography</option>
                            </select>
                            <button style={{padding: "5px", margin: "10px", borderRadius: "10px", width: "30%"}}>Upload
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