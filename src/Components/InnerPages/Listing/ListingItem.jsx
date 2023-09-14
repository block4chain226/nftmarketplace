import React, {useContext, useEffect, useState} from 'react';

import {Link} from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import useBlockchain from "../../../hooks/useBlockchain";
import BuyModal from "../../../Modal/ConfirmBuying/BuyModal";
import {ethers} from "ethers";
import marketplaceABI from "../../../abis/marketplace.json";

const ListingItem = ({item}) => {

    const {accounts, provider} = useContext(AuthContext);
    const {signTransaction} = useBlockchain();

    const [showBuyModal, setShowBuyModal] = useState(false);
    const [makePurchase, setMakePurchase] = useState(false);
    //TODO Metamask relogin when change address and delete listing from UsersListing after success selling
    //TODO update UsersContracts after token buy
    const buy = async () => {
        console.log("itemBuy", item);
        const contract = new ethers.Contract("0xB1Ce55E2AEA74919e74cE8dF6c15E7543E1Cbff3", marketplaceABI.abi, accounts.address);
        const hash = await signTransaction(accounts.address, item.price, item.seller, item.token, item.tokenId);
        const totalPrice = 1000 + item.price;
        console.log("=>(ListingItem.jsx:23) totalPrice", totalPrice);
        const res = await contract.connect(accounts).buy(item.price, item.seller, item.token, item.tokenId, hash, {value: ethers.parseUnits(totalPrice.toString(), "wei")});
        console.log("=>(ListingItem.jsx:18) res", res);
        setMakePurchase(false)
        setShowBuyModal(false)
    }

    useEffect(() => {
        if (makePurchase === true) {
            buy();
        }

    }, [makePurchase])

    return (

        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            {showBuyModal && <BuyModal image={item.image} name={item.name} collectionName={item.collectionName}
                                       setShowBuyModal={setShowBuyModal} setMakePurchase={setMakePurchase}
                                       showBuyModal={showBuyModal}/>}
            <div className="top-collection-item">
                <div className="collection-item-top">
                    <ul>
                        <li className="avatar"><a href="/author-profile" className="thumb"><img
                            src="assets/img/others/top_col_avatar.png" alt=""/></a>By <a href="/author-profile"
                                                                                         className="name">Jonson</a>
                        </li>
                        <li className="info-dots dropdown">
                            <span/>
                            <span/>
                            <span/>
                            <a href="/#" className="dropdown-toggle" data-bs-toggle="dropdown" role="button"
                               aria-expanded="false"/>
                            <ul className="dropdown-menu">
                                <li><a href="/nft-marketplace">Artwork</a></li>
                                <li><a href="/nft-marketplace">Action</a></li>
                                <li><a href="/nft-marketplace">Author Action</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="collection-item-thumb">
                    <Link to={`/single-market/${item.listingId}`}><img src={item.image} alt=""/></Link>
                </div>
                <div className="collection-item-content">
                    <h5 className="title"><a href="/market-single">{item.name}</a> <span
                        className="price">{item.price}</span></h5>
                </div>
                <div className="collection-item-bottom">
                    <ul>
                        <li className="bid">
                            <button className="btn" onClick={() => {
                                setShowBuyModal(true)
                            }}>buy
                            </button>
                        </li>
                        <li className="wishlist"><a href="/#">59</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ListingItem;