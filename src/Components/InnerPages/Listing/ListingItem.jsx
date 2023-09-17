import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import useBlockchain from "../../../hooks/useBlockchain";
import {ethers} from "ethers";
import marketplaceABI from "../../../abis/marketplace.json";
import useUserWriteToDb from "../../../hooks/useUserWriteToDb";
import MakeOfferModal from "../../../Modal/MakeOffer/MakeOfferModal";
import BuyModal from "../../../Modal/ConfirmBuying/BuyModal";
import useFetchFromDb from "../../../hooks/useFetchFromDb";

const ListingItem = ({item}) => {
    const {accounts} = useContext(AuthContext);
    const {signBuyTransaction} = useBlockchain();
    const {unListTokenDB, deleteUserListedTokenDB, writeUserContractDB, writeListingOffer} = useUserWriteToDb();
    const {getLastOfferPrice} = useFetchFromDb();

    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showOfferModal, setShowOfferModal] = useState(false);
    const [makePurchase, setMakePurchase] = useState(false);
    const [offerPrice, setOfferPrice] = useState(0);
    const [makeOffer, setMakeOffer] = useState(false);
    const [showItem, setShowItem] = useState(true);
    const [bestOffer, setBestOffer] = useState({account: "", bestOffer: 0});
    const [error, setError] = useState(null);

    const buy = async () => {
        const contract = new ethers.Contract("0xB1Ce55E2AEA74919e74cE8dF6c15E7543E1Cbff3", marketplaceABI.abi, accounts.address);
        const hash = await signBuyTransaction(accounts, item.price, item.seller, item.token, item.tokenId);
        const totalPrice = 1000 + item.price;
        try {
            await contract.connect(accounts).buy(item.price, item.seller, item.token, item.tokenId, hash, {value: ethers.parseUnits(totalPrice.toString(), "wei")});
            await unListTokenDB(item.listingId);
            await deleteUserListedTokenDB(item.seller, item.token, item.tokenId);
            await writeUserContractDB(accounts, item.token, item.category, item.collectionName);
            setMakePurchase(false);
            setShowBuyModal(false);
            setShowItem(false);
        } catch (err) {
            console.error(err);
        }
    }

    const makeNewOffer = async () => {
        if ((accounts !== null || undefined) && offerPrice > 0) {
            await getLastOfferPrice(item.listingId);
            console.log("bestOffer", bestOffer);
            if ((bestOffer === null && offerPrice <= item.price) || (offerPrice > bestOffer.bestOffer && offerPrice <= item.price)) {
                try {
                    await writeListingOffer(item.listingId, accounts.address, offerPrice);
                    setOfferPrice(0);
                    setShowOfferModal(false);
                } catch (err) {
                    console.log(err);
                }
            } else {
                setMakeOffer(false);
                setError("Your offer must be bigger than the last one and lower than floor price");
            }
        } else {
            setMakeOffer(false);
            console.log("offerPrice or account are empty");
        }
    }

    const getBestOfferPrice = async (listingId) => {
        const bestOfferData = await getLastOfferPrice(item.listingId);
        setBestOffer(bestOfferData);
    }

    useEffect(() => {
        if (makePurchase === true) {
            buy();
        }
    }, [makePurchase])

    useEffect(() => {
        if (makeOffer === true) {
            makeNewOffer();
        }
    }, [makeOffer])

    useEffect(() => {
        getBestOfferPrice(item.listingId);
        setMakeOffer(false);
    }, [offerPrice])

    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            {showOfferModal && <MakeOfferModal image={item.image} name={item.name} collectionName={item.collectionName}
                                               setShowOfferModal={setShowOfferModal} setMakeOffer={setMakeOffer}
                                               showOfferModal={showOfferModal} offerPrice={offerPrice}
                                               floorPrice={item.price} bestOffer={bestOffer}
                                               setOfferPrice={setOfferPrice} setError={setError} error={error}/>}
            {showBuyModal && <BuyModal image={item.image} name={item.name} collectionName={item.collectionName}
                                       setShowBuyModal={setShowBuyModal} setMakePurchase={setMakePurchase}
                                       showBuyModal={showBuyModal}/>}
            {showItem && <div className="top-collection-item">
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
                        <li className="bid" style={{width: "30%"}}>
                            <button className="btn" style={{width: "30%"}} onClick={() => {
                                setShowBuyModal(true)
                            }}>buy
                            </button>
                        </li>
                        <li className="bid" style={{width: "30%"}}>
                            <button className="btn" style={{width: "30%"}} onClick={() => {
                                setShowOfferModal(true)
                            }}>Make Offer
                            </button>
                        </li>
                        <li className="wishlist"><a href="/#">59</a></li>
                    </ul>
                </div>
            </div>}
        </div>
    );
};

export default ListingItem;