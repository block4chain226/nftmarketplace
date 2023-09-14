import React from 'react';
import cl from "./BuyModal.module.css"


const BuyModal = ({image, name, collectionName, setShowBuyModal, setMakePurchase, showBuyModal}) => {

    return (
        <>
            {showBuyModal &&
                <div className={cl.Overlay}>
                    <div className={cl.Modal}>
                        <div className={cl.container}>
                            <div className={cl.rectangle} onClick={() => setShowBuyModal(false)}></div>
                            <div className={cl.pic} style={{width: "80%", marginRight: "20px"}}><img src={image}
                                                                                                     style={{maxWidth: "100%"}}
                                                                                                     alt=""/></div>
                            <div className={cl.info}>
                                <div className={cl.text}>
                                    <span>{name}</span>
                                    <span>{collectionName}</span>
                                </div>
                                <div className={cl.buttons}>
                                    <button onClick={() => setMakePurchase(true)}>buy</button>
                                    <button>cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    );
};

export default BuyModal;