import React from 'react';
import Header from "../Header/Header";
import Banner from "../Explore/Banner";
import Category from "../Category/Category";
import Footer from "../Footer/Footer";
import AllOffers from "./AllOffers";
import {useParams} from "react-router-dom";

const OffersMade = () => {

    return (
        <div className="main-content">
            <Header/>
            <main>
                <Banner title="Authors Profile"/>
                <Category/>
                <AllOffers/>
            </main>
            <Footer/>
        </div>
    );
};

export default OffersMade;