import React, {useContext, useEffect, useState} from 'react';
import cl from "./MakeOfferModal.module.css"
import AuthContext from "../../context/AuthContext";
import {ethers} from "ethers";


const MakeOfferModal = ({
                            image,
                            name,
                            collectionName,
                            setShowOfferModal,
                            setMakeOffer,
                            offerPrice,
                            setOfferPrice,
                            showOfferModal
                        }) => {

    const {accounts, provider} = useContext(AuthContext);
    const [balance, setBalance] = useState("");
    const [error, setError] = useState(null);

    const getAccountBalance = async () => {
        const balance = await provider.getBalance(accounts.address);
        setBalance(ethers.formatEther(balance));
    }

    const setOffer = async () => {
        if (offerPrice > 0) {
            setError(null);
            setMakeOffer(true);
        } else {
            setError("Offer input must not be empty");
            setMakeOffer(false);
        }
    }

    useEffect(() => {
        getAccountBalance();
    }, [])

    return (
        <>
            {showOfferModal &&
                <div className={cl.Overlay}>
                    <div className={cl.Modal}>
                        <div className={cl.container}>
                            <div className={cl.rectangle} onClick={() => setShowOfferModal(false)}></div>
                            <div className={cl.title}>{error && !offerPrice ? <h4>{error}</h4> :
                                <h3>Make an offer</h3>}</div>
                            <div className={cl.image_info}>
                                <div className={cl.picture}>
                                    <img src={image} alt=""/>
                                </div>
                                <div className={cl.text}>
                                    <span style={{marginRight: "10px"}}>{collectionName}</span>
                                    <span>{name}</span>
                                </div>
                            </div>
                            <div className={cl.balance_info}>
                                <div className={cl.balance}>
                                    <span>Balance</span>
                                    <span>{balance}</span>
                                </div>
                                <div className={cl.floor_price}>
                                    <span>Floor price</span>
                                    <span>0 Ether</span>
                                </div>
                                <div className={cl.best_offer}>
                                    <span>Best offer</span>
                                    <span>0 Ether</span>
                                </div>
                            </div>
                            <div className={cl.input}>
                                <p>{offerPrice}</p>
                                <input type="number"
                                       pattern="[0-9]*"
                                       onChange={(e) => setOfferPrice(e.target.value)}
                                       style={{
                                           borderRadius: "10px",
                                           border: "0px",
                                           width: "86%",
                                           paddingLeft: "10px"
                                       }}/>
                                <label style={{color: "white", fontSize: "1.2vw"}}>Eth offer</label>
                            </div>
                            <button className={cl.buttons1} onClick={setOffer}>Make offer</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default MakeOfferModal;