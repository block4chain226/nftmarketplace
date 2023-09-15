import React from 'react';
import {Link} from "react-router-dom";
import Header from "../../Header/Header";
import Banner from "../../Explore/Banner";
import Footer from "../../Footer/Footer";

const ListingCollection = ({item}) => {

    return (
        <div className="main-content">
            <Header/>
            <main>
                <Banner title="Listed Nfts"/>
                <div className="col-xl-4 col-md-6 col-sm-6">
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
                        <div className="collection-item-thumb" style={{cursor: "pointer"}}>
                            <Link to={`/collection-items/${item.token}`}><img src={item.image} alt=""/></Link>


                        </div>
                        <div className="collection-item-content">
                            <h5 className="title"><a href="/market-single">{item.collectionName}</a> <span
                                className="price">5.4 ETH</span></h5>
                        </div>
                        <div className="collection-item-bottom">
                            <ul>
                                <li className="bid"><a href="/market-single"
                                                       className="btn">place a bid</a>
                                </li>
                                <li className="wishlist"><a
                                    href="/login-register">59</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer/>
            </main>
        </div>
    );
};

export default ListingCollection;