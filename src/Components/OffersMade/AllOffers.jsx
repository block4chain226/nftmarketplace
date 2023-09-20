import React from 'react';
import OffersList from "./OffersList/OffersList";

const AllOffers = () => {
    return (
        <div className="row justify-content-center">
            {/*{showModal ? <Modal show={showModal} setShowModal={setShowModal}/> : ""}*/}
            <div className="col-xl-3 col-lg-4 col-md-6 order-2 order-lg-0">
                <aside className="author-profile-wrap">
                    <div className="author-profile-thumb">
                        <img src="assets/img/others/author_profile.png" alt=""/>
                    </div>
                    <div className="author-info">
                        <h5 className="title">Olivia Jenar <img src="assets/img/icons/star.svg" alt=""/></h5>
                        <span>@ marketplace</span>
                        <p>Myself Olivia_ ipsum dolor amet this consectetur adipisicing elit. Quis non fugit
                            totam laborio.</p>
                    </div>
                    <ul className="author-collection">
                        <li>
                            <p>Collection</p>
                            <span>201</span>
                        </li>
                        <li>
                            <p>Creation</p>
                            <span>235</span>
                        </li>
                    </ul>
                    <div className="author-social">
                        <h6 className="title">Follow Social Media :</h6>
                        <ul>
                            <li><a href="/#">
                                <div className="icon"><i className="fab fa-facebook-f"/></div>
                                Facebook / @joys_Aoi</a></li>
                            <li><a href="/#">
                                <div className="icon"><i className="fab fa-facebook-messenger"/></div>
                                Messenger / @joys_Avi</a></li>
                            <li><a href="/#">
                                <div className="icon"><i className="fab fa-whatsapp"/></div>
                                Whatsapp / @joys_Avi</a></li>
                            <li><a href="/#">
                                <div className="icon"><i className="fab fa-youtube"/></div>
                                Youtube / @joys_Avi</a></li>
                        </ul>
                    </div>
                </aside>
            </div>
            <div className="col-xl-9 col-lg-8">
                <div className="author-product-meta">
                    <ul>
                        <li className="active"><a href="/author-profile">All nft</a></li>
                        {/*<li><Link to={`/offers-made/${accounts.address}`}>Made Offers</Link></li>*/}
                        <li><a href="/author-profile">Collectibles</a></li>
                        <li><a href="/author-profile">Music</a></li>
                        {/*<li>*/}
                        {/*<button onClick={() => setShowModal(true)}>Load Collection</button>*/}
                        {/*</li>*/}
                    </ul>
                </div>
                <OffersList/>
            </div>
        </div>
    );
};

export default AllOffers;