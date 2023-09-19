import React, {useContext, useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import useFetchCollection from "../../../hooks/useFetchCollection";
import AuthContext from "../../../context/AuthContext";
import useUserWriteToDb from "../../../hooks/useUserWriteToDb";
import useFetchFromDb from "../../../hooks/useFetchFromDb";
import Header from "../../Header/Header";
import Banner from "../../Explore/Banner";
import Footer from "../../Footer/Footer";
import OffersHistory from "../../OffersHistory/OffersHistory";

const NftSingle = () => {
    const {tokenId, contract} = useParams();
    const {accounts} = useContext(AuthContext);

    const [nft, setNft] = useState({});
    const [listingId, setListingId] = useState("");
    const [listed, setListed] = useState(false);
    const [bestOffer, setBestOffer] = useState({account: "", bestOffer: 0});
    const [offerUpdate, setOfferUpdate] = useState(false);

    const {getAllSingleContractTokensOfUser} = useFetchCollection();
    const {listTokenDB, unListTokenDB, deleteUserListedTokenDB, writeOrUpdateUserListedTokensDB} = useUserWriteToDb();
    const {getUserContractListedTokens, getHash, getLastOfferPrice} = useFetchFromDb();

    const getNftInfo = async () => {
        const allNfts = await getAllSingleContractTokensOfUser("5", accounts.address, contract);
        const nft1 = allNfts.filter(item => item.tokenId === tokenId);
        setNft(nft1[0]);
    }

    const listToken = async (e) => {
        e.preventDefault();
        let listingBtn = document.getElementById("listBtn".concat(nft.tokenId));
        await writeOrUpdateUserListedTokensDB(accounts, nft.contract, nft.tokenId, getUserContractListedTokens, listingBtn.getAttribute("listingId"));
        await listTokenDB(accounts, nft.contract, 300000, nft.tokenId, nft.category, nft.collectionName, nft.metadata.image, nft.metadata.description, nft.metadata.name);
        setTimeout(() => {
            setListed(true);
        }, 500)
    }

    const isListed = async () => {
        const allContractListedTokens = await getUserContractListedTokens(accounts, contract);
        setListingAttribute();
        if (allContractListedTokens) {
            const result = allContractListedTokens.tokens.includes(tokenId);
            setListed(result);
        }
    }

    const unListToken = async (e) => {
        e.preventDefault();
        const listingId = document.getElementById("listBtn".concat(nft.tokenId)).getAttribute("listingId");
        await deleteUserListedTokenDB(accounts.address, nft.contract, nft.tokenId);
        await unListTokenDB(listingId);
        setTimeout(() => {
            setListed(false);
        }, 500)
    }

    const setListingAttribute = async () => {
        let listingBtn = document.getElementById("listBtn".concat(tokenId));
        const atr = (accounts.address).concat(contract, tokenId)
        setListingId(atr);
        listingBtn.setAttribute("listingId", atr);
    }

    const getBestOfferPrice = async (listingId) => {
        const bestOfferData = await getLastOfferPrice(listingId);
        setBestOffer(bestOfferData);
    }

    useEffect(() => {
        getNftInfo();
    }, [])

    useEffect(() => {
        isListed();
        getHash();
    }, [listed])

    useEffect(() => {
        if (listingId !== "" || undefined || null) {
            getBestOfferPrice(listingId);
        }
    }, [listingId])

    return (
        <div className="main-content">
            <Header/>
            <main>
                {nft.contract ? <Banner title={`${nft.collectionName} / ${nft.metadata.name}`}/> : ""}
                <section className="market-single-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                {nft.contract && < div className="market-single-img">
                                    <img src={nft.metadata.image} alt=""/>
                                </div>}
                            </div>
                            <div className="col-lg-6">
                                <div className="market-single-top">
                                    <div className="market-single-title-wrap">
                                        <h2 className="title"></h2>
                                        <ul className="market-details-meta">
                                            <li>Owned by <a href="/#">{nft.seller}</a></li>
                                            <li className="wishlist">6 favorites</li>
                                        </ul>
                                    </div>
                                    <div className="market-single-action">
                                        <ul>
                                            <li><a href="/#"><i className="fas fa-share-alt"/></a></li>
                                            <li><a href="/#"><i className="fi-sr-menu-dots"/></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="market-single-creator">
                                            <div className="thumb"><img src="assets/img/others/mp_avatar01.png" alt=""/>
                                            </div>
                                            <div className="info">
                                                <h5 className="title"><a href="/author-profile">David Michels</a></h5>
                                                <span>Creators by</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="market-single-creator">
                                            <div className="thumb"><img src="assets/img/others/mp_avatar02.png" alt=""/>
                                            </div>
                                            <div className="info">
                                                <h5 className="title"><a href="/author-profile">MR. Tartos</a></h5>
                                                <span>Collection by</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="market-single-content">
                                    <p>{}</p>
                                </div>
                                <div className="highest-bid-wrap">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-12 col-md-6">
                                            <h5 className="title">Best offer</h5>
                                            <div className="highest-bid-avatar">
                                                <div className="thumb"><img src="assets/img/others/heighest_avatar.png"
                                                                            alt=""/>
                                                </div>
                                                {bestOffer !== null || undefined || "" ?
                                                    <div className="content"><h5 className="title"><a
                                                        href="/author-profile">{bestOffer.account}</a></h5>
                                                        <span>{bestOffer.bestOffer} Eth</span>
                                                    </div> : <h5>Token has no offers</h5>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-12 col-md-6">
                                            {/*<div className="bid-countdown-wrap">*/}
                                            {/*    <div className="coming-time" data-countdown="2022/05/16"/>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                                <div className="collection-item-bottom" id={"listBtn".concat(tokenId)}>
                                    <ul>
                                        {!listed ?
                                            <li className="bid"><a href="/market-single"
                                                                   onClick={(e) => listToken(e)}
                                                                   className="btn">List</a></li> :
                                            <li className="bid"><a href="/market-single"
                                                                   onClick={(e) => unListToken(e)}
                                                                   className="btn">Unlist</a></li>
                                        }
                                        <li className="wishlist"><a
                                            href="/login-register">59</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="bid-history-wrap">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="bid-tab" data-bs-toggle="tab"
                                                    data-bs-target="#bid" type="button" role="tab"
                                                    aria-controls="bid"
                                                    aria-selected="true">Offers History
                                            </button>
                                        </li>
                                    </ul>
                                    <OffersHistory key={nft.tokenId} listingId={listingId} offerUpdate={offerUpdate}
                                                   timer={true}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </main>
        </div>
    )
}

export default NftSingle