import React, {useContext, useEffect, useState} from 'react';
import useFetchCollection from "../../../hooks/useFetchCollection";
import AuthContext from "../../../context/AuthContext";
import useUserWriteToDb from "../../../hooks/useUserWriteToDb";
import useFetchFromDb from "../../../hooks/useFetchFromDb";
import {log} from "@web3auth/base";

const Portfolio = () => {
    const {accounts} = useContext(AuthContext);

    const [collections, setCollections] = useState([]);

    const {getAllContractsTokensOfUser} = useFetchCollection();
    const {writeUserContractDB} = useUserWriteToDb();
    const {getUserContractsList} = useFetchFromDb();
    //TODO get All Collections with name, picture. contract->metadata->item
    //TODO loop-> curContr!==preVcontract->add curContr info array->if==prevContr->continue

    const getCollectionsData = async (account) => {
        if (account !== undefined || "") {
            const contracts = await getUserContractsList(accounts);
            const allTokens = await getAllContractsTokensOfUser("5", account);
            console.log("=>(Portfolio.jsx:21) allTokens", allTokens);
            //TODO need get first element of each contract
            // allTokens.map((item, index) => console.log(index, item));
            let lastContract;
            for (let i = 0; i < allTokens.length; i++) {
                console.log(allTokens[i])
                if (i === 0) {
                    lastContract = allTokens[i].contract;
                    continue;
                }
                if (allTokens[i].contract === lastContract) {
                    allTokens.splice(i, 1);
                    i--;
                }
                if (allTokens[i].contract !== lastContract) {
                    lastContract = allTokens[i].contract
                }
            }
            setCollections(allTokens);
        }
    }

    useEffect(() => {
        if (accounts !== null) getCollectionsData(accounts);
    }, [accounts])

    return (
        <div className="row justify-content-center">
            <div className="col-xl-4 col-md-6 col-sm-6">
                {
                    collections.map((item, index) => (
                            <div className="top-collection-item">
                                <div className="collection-item-top">
                                    <ul>
                                        <li className="avatar"><a href="/author-profile" className="thumb"><img
                                            src="assets/img/others/top_col_avatar.png" alt=""/></a>By <a
                                            href="/author-profile" className="name">Jonson</a></li>
                                        <li className="info-dots dropdown">
                                            <span/>
                                            <span/>
                                            <span/>
                                            <a href="/#" className="dropdown-toggle" data-bs-toggle="dropdown"
                                               role="button" aria-expanded="false"/>
                                            <ul className="dropdown-menu">
                                                <li><a href="/nft-marketplace">Artwork</a></li>
                                                <li><a href="/nft-marketplace">Action</a></li>
                                                <li><a href="/nft-marketplace">Author Action</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="collection-item-thumb">
                                    <a href="/market-single"><img src={item.metadata.image} alt=""/></a>
                                </div>
                                <div className="collection-item-content">
                                    <h5 className="title"><a href="/market-single">{item.metadata.}</a> <span
                                        className="price">5.4 ETH</span></h5>
                                </div>
                                <div className="collection-item-bottom">
                                    <ul>
                                        <li className="bid"><a href="/market-single" className="btn">place a bid</a>
                                        </li>
                                        <li className="wishlist"><a href="/login-register">59</a></li>
                                    </ul>
                                </div>
                            </div>
                        )
                    )
                }

            </div>
            {/*<div className="col-xl-4 col-md-6 col-sm-6">*/}
            {/*    <div className="top-collection-item">*/}
            {/*        <div className="collection-item-top">*/}
            {/*            <ul>*/}
            {/*                <li className="avatar"><a href="/author-profile" className="thumb"><img*/}
            {/*                    src="assets/img/others/top_col_avatar.png" alt=""/></a>By <a*/}
            {/*                    href="/author-profile" className="name">Jonson</a></li>*/}
            {/*                <li className="info-dots dropdown">*/}
            {/*                    <span/>*/}
            {/*                    <span/>*/}
            {/*                    <span/>*/}
            {/*                    <a href="/#" className="dropdown-toggle" data-bs-toggle="dropdown"*/}
            {/*                       role="button" aria-expanded="false"/>*/}
            {/*                    <ul className="dropdown-menu">*/}
            {/*                        <li><a href="/nft-marketplace">Artwork</a></li>*/}
            {/*                        <li><a href="/nft-marketplace">Action</a></li>*/}
            {/*                        <li><a href="/nft-marketplace">Author Action</a></li>*/}
            {/*                    </ul>*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-thumb">*/}
            {/*            <a href="/market-single"><img src="assets/img/others/top_collection05.jpg"*/}
            {/*                                          alt=""/></a>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-content">*/}
            {/*            <h5 className="title"><a href="/market-single">Pie Collection</a> <span*/}
            {/*                className="price">5.4 ETH</span></h5>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-bottom">*/}
            {/*            <ul>*/}
            {/*                <li className="bid"><a href="/market-single" className="btn">place a bid</a>*/}
            {/*                </li>*/}
            {/*                <li className="wishlist"><a href="/#">59</a></li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="col-xl-4 col-md-6 col-sm-6">*/}
            {/*    <div className="top-collection-item">*/}
            {/*        <div className="collection-item-top">*/}
            {/*            <ul>*/}
            {/*                <li className="avatar"><a href="/author-profile" className="thumb"><img*/}
            {/*                    src="assets/img/others/top_col_avatar.png" alt=""/></a>By <a*/}
            {/*                    href="/author-profile" className="name">Jonson</a></li>*/}
            {/*                <li className="info-dots dropdown">*/}
            {/*                    <span/>*/}
            {/*                    <span/>*/}
            {/*                    <span/>*/}
            {/*                    <a href="/#" className="dropdown-toggle" data-bs-toggle="dropdown"*/}
            {/*                       role="button" aria-expanded="false"/>*/}
            {/*                    <ul className="dropdown-menu">*/}
            {/*                        <li><a href="/nft-marketplace">Artwork</a></li>*/}
            {/*                        <li><a href="/nft-marketplace">Action</a></li>*/}
            {/*                        <li><a href="/nft-marketplace">Author Action</a></li>*/}
            {/*                    </ul>*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-thumb">*/}
            {/*            <a href="/market-single"><img src="assets/img/others/top_collection06.jpg"*/}
            {/*                                          alt=""/></a>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-content">*/}
            {/*            <h5 className="title"><a href="/market-single">Artwork Collection</a> <span*/}
            {/*                className="price">5.4 ETH</span></h5>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-bottom">*/}
            {/*            <ul>*/}
            {/*                <li className="bid"><a href="/market-single" className="btn">place a bid</a>*/}
            {/*                </li>*/}
            {/*                <li className="wishlist"><a href="/#">59</a></li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="col-xl-4 col-md-6 col-sm-6">*/}
            {/*    <div className="top-collection-item">*/}
            {/*        <div className="collection-item-top">*/}
            {/*            <ul>*/}
            {/*                <li className="avatar"><a href="/author-profile" className="thumb"><img*/}
            {/*                    src="assets/img/others/top_col_avatar.png" alt=""/></a>By <a*/}
            {/*                    href="/author-profile" className="name">Jonson</a></li>*/}
            {/*                <li className="info-dots dropdown">*/}
            {/*                    <span/>*/}
            {/*                    <span/>*/}
            {/*                    <span/>*/}
            {/*                    <a href="/#" className="dropdown-toggle" data-bs-toggle="dropdown"*/}
            {/*                       role="button" aria-expanded="false"/>*/}
            {/*                    <ul className="dropdown-menu">*/}
            {/*                        <li><a href="/nft-marketplace">Artwork</a></li>*/}
            {/*                        <li><a href="/nft-marketplace">Action</a></li>*/}
            {/*                        <li><a href="/nft-marketplace">Author Action</a></li>*/}
            {/*                    </ul>*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-thumb">*/}
            {/*            <a href="/market-single"><img src="assets/img/others/top_collection07.jpg"*/}
            {/*                                          alt=""/></a>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-content">*/}
            {/*            <h5 className="title"><a href="/market-single">Action Collection</a> <span*/}
            {/*                className="price">5.4 ETH</span></h5>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-bottom">*/}
            {/*            <ul>*/}
            {/*                <li className="bid"><a href="/market-single" className="btn">place a bid</a>*/}
            {/*                </li>*/}
            {/*                <li className="wishlist"><a href="/#">59</a></li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="col-xl-4 col-md-6 col-sm-6">*/}
            {/*    <div className="top-collection-item">*/}
            {/*        <div className="collection-item-top">*/}
            {/*            <ul>*/}
            {/*                <li className="avatar"><a href="/author-profile" className="thumb"><img*/}
            {/*                    src="assets/img/others/top_col_avatar.png" alt=""/></a>By <a*/}
            {/*                    href="/author-profile" className="name">Jonson</a></li>*/}
            {/*                <li className="info-dots dropdown">*/}
            {/*                    <span/>*/}
            {/*                    <span/>*/}
            {/*                    <span/>*/}
            {/*                    <a href="/#" className="dropdown-toggle" data-bs-toggle="dropdown"*/}
            {/*                       role="button" aria-expanded="false"/>*/}
            {/*                    <ul className="dropdown-menu">*/}
            {/*                        <li><a href="/nft-marketplace">Artwork</a></li>*/}
            {/*                        <li><a href="/nft-marketplace">Action</a></li>*/}
            {/*                        <li><a href="/nft-marketplace">Author Action</a></li>*/}
            {/*                    </ul>*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-thumb">*/}
            {/*            <a href="/market-single"><img src="assets/img/others/top_collection08.jpg"*/}
            {/*                                          alt=""/></a>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-content">*/}
            {/*            <h5 className="title"><a href="/market-single">Artwork Collection</a> <span*/}
            {/*                className="price">5.4 ETH</span></h5>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-bottom">*/}
            {/*            <ul>*/}
            {/*                <li className="bid"><a href="/market-single" className="btn">place a bid</a>*/}
            {/*                </li>*/}
            {/*                <li className="wishlist"><a href="/#">59</a></li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="col-xl-4 col-md-6 col-sm-6">*/}
            {/*    <div className="top-collection-item">*/}
            {/*        <div className="collection-item-top">*/}
            {/*            <ul>*/}
            {/*                <li className="avatar"><a href="/author-profile" className="thumb"><img*/}
            {/*                    src="assets/img/others/top_col_avatar.png" alt=""/></a>By <a*/}
            {/*                    href="/author-profile" className="name">Jonson</a></li>*/}
            {/*                <li className="info-dots dropdown">*/}
            {/*                    <span/>*/}
            {/*                    <span/>*/}
            {/*                    <span/>*/}
            {/*                    <a href="/#" className="dropdown-toggle" data-bs-toggle="dropdown"*/}
            {/*                       role="button" aria-expanded="false"/>*/}
            {/*                    <ul className="dropdown-menu">*/}
            {/*                        <li><a href="/nft-marketplace">Artwork</a></li>*/}
            {/*                        <li><a href="/nft-marketplace">Action</a></li>*/}
            {/*                        <li><a href="/nft-marketplace">Author Action</a></li>*/}
            {/*                    </ul>*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-thumb">*/}
            {/*            <a href="/market-single"><img src="assets/img/others/top_collection09.jpg"*/}
            {/*                                          alt=""/></a>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-content">*/}
            {/*            <h5 className="title"><a href="/market-single">NFT Collection</a> <span*/}
            {/*                className="price">5.4 ETH</span></h5>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-bottom">*/}
            {/*            <ul>*/}
            {/*                <li className="bid"><a href="/market-single" className="btn">place a bid</a>*/}
            {/*                </li>*/}
            {/*                <li className="wishlist"><a href="/#">59</a></li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="col-xl-4 col-md-6 col-sm-6">*/}
            {/*    <div className="top-collection-item">*/}
            {/*        <div className="collection-item-top">*/}
            {/*            <ul>*/}
            {/*                <li className="avatar"><a href="/author-profile" className="thumb"><img*/}
            {/*                    src="assets/img/others/top_col_avatar.png" alt=""/></a>By <a*/}
            {/*                    href="/author-profile" className="name">Jonson</a></li>*/}
            {/*                <li className="info-dots dropdown">*/}
            {/*                    <span/>*/}
            {/*                    <span/>*/}
            {/*                    <span/>*/}
            {/*                    <a href="/#" className="dropdown-toggle" data-bs-toggle="dropdown"*/}
            {/*                       role="button" aria-expanded="false"/>*/}
            {/*                    <ul className="dropdown-menu">*/}
            {/*                        <li><a href="/nft-marketplace">Artwork</a></li>*/}
            {/*                        <li><a href="/nft-marketplace">Action</a></li>*/}
            {/*                        <li><a href="/nft-marketplace">Author Action</a></li>*/}
            {/*                    </ul>*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-thumb">*/}
            {/*            <a href="/market-single"><img src="assets/img/others/top_collection09.jpg"*/}
            {/*                                          alt=""/></a>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-content">*/}
            {/*            <h5 className="title"><a href="/market-single">NFT Collection</a> <span*/}
            {/*                className="price">5.4 ETH</span></h5>*/}
            {/*        </div>*/}
            {/*        <div className="collection-item-bottom">*/}
            {/*            <ul>*/}
            {/*                <li className="bid"><a href="/market-single" className="btn">place a bid</a>*/}
            {/*                </li>*/}
            {/*                <li className="wishlist"><a href="/#">59</a></li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default Portfolio;