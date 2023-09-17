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
                            showOfferModal,
                            bestOffer,
                            floorPrice,
                            setError,
                            duration,
                            setDuration,
                            error
                        }) => {
    const {accounts, provider} = useContext(AuthContext);
    const [balance, setBalance] = useState("");


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
                            {error && error}
                            <div className={cl.title}><h3>Make an offer</h3></div>
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
                                    <span>{ethers.formatEther(floorPrice)}</span>
                                </div>
                                <div className={cl.best_offer}>
                                    <span>Best offer</span>
                                    <span>{bestOffer && ethers.formatEther(ethers.parseUnits(bestOffer.bestOffer.toString(), 18))}</span>
                                </div>
                            </div>
                            <div className={cl.input}>
                                <input type="number"
                                       id="input1"
                                       pattern="[0-9]*"
                                       onChange={(e) => setOfferPrice(e.target.value)}
                                       style={{
                                           borderRadius: "10px",
                                           border: "0px",
                                           width: "86%",
                                           padding: "5px 10px"
                                       }}/>
                                <label style={{color: "white", fontSize: "1.2vw"}}>Eth offer</label>
                            </div>
                            <div className={cl.duration}>
                                < select onChange={(e) => {
                                    setDuration(e.target.value)
                                }} defaultValue={duration}>
                                    <option value="1">1 day</option>
                                    <option value="3">3 days</option>
                                    <option value="7">7 days</option>
                                    <option value="14">14 days</option>
                                    <option value="30">30 days</option>
                                </select>
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