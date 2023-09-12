import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useFetchFromDb from "../../../hooks/useFetchFromDb";
import ListingItem from "./ListingItem";

const CollectionItems = () => {

    const {token} = useParams();

    const {getAllCollectionListings} = useFetchFromDb();

    const [allCollectionListings, setAllCollectionListings] = useState([]);

    const getCollectionListings = async () => {
        const allListings = await getAllCollectionListings(token);
        console.log("=>(CollectionItems.jsx:15) allListings", allListings);
        setAllCollectionListings(allListings);

    }

    useEffect(() => {
        getCollectionListings()
    }, [])

    return (
        <section className="inner-explore-products">
            <h1>Collection items</h1>
            <div className="container">
                <div className="explore-product-filter">
                    <div className="section-title mb-45">
                        <h2 className="title">Artworks <img src="assets/img/icons/title_icon01.png" alt=""/></h2>
                    </div>
                    <div className="filter-wrap">
                        <form action="#">
                            <div className="filter-item">
                                <label className="title">FILTER BY:</label>
                                <label className="switch">
                                    <input type="checkbox"/>
                                    <span className="button"/>
                                </label>
                            </div>
                            <div className="filter-item">
                                <label className="title">Has list price:</label>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked/>
                                    <span className="button"/>
                                </label>
                            </div>
                            <div className="filter-item">
                                <label className="title">Has open offer</label>
                                <label className="switch">
                                    <input type="checkbox"/>
                                    <span className="button"/>
                                </label>
                            </div>
                            <div className="filter-item">
                                <label className="title">Owned by creator</label>
                                <label className="switch">
                                    <input type="checkbox"/>
                                    <span className="button"/>
                                </label>
                            </div>
                            <div className="filter-item">
                                <label className="title">Has sold</label>
                                <label className="switch">
                                    <input type="checkbox"/>
                                    <span className="button"/>
                                </label>
                            </div>
                            <button className="btn filter-btn"><i className="fi-sr-filter"/> filter</button>
                        </form>
                    </div>
                </div>
                <div className="row justify-content-left">
                    {allCollectionListings.map(item => (
                        <ListingItem item={item} key={item.name}/>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CollectionItems;