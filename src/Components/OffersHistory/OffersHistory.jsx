import React, {useContext, useEffect, useState} from 'react';
import useFetchFromDb from "../../hooks/useFetchFromDb";
import OffersItem from "./OffersItem";
import useUserWriteToDb from "../../hooks/useUserWriteToDb";
import AuthContext from "../../context/AuthContext";

const OffersHistory = ({listingId, offerUpdate, timer}) => {
    const {accounts} = useContext(AuthContext);
    const {getListingOffers} = useFetchFromDb();
    const [listingOffers, setListingOffers] = useState({});
    const [showTimer, setShowTimer] = useState(false);
    const {deleteListingOffer, deleteUserOffer, writeUsersListingIds, deleteUsersListingsIds} = useUserWriteToDb();

    const initial = async () => {
        try {
            const listingOffers = await getListingOffers(listingId);
            console.log(Object.keys(listingOffers).length)
            console.log("=>(OffersHistory.jsx:15) listingOffers", listingOffers);
            for (let listing in listingOffers) {
                if (new Date().getTime() >= listingOffers[listing].endDate) {
                    const offerId = await deleteListingOffer(listingId, listing, listingOffers);
                    await deleteUserOffer(accounts.address, listingId, offerId);
                }
            }
            // await deleteListingOffer(listingId, lalala, listingOffers);
            listingOffers !== null ? setListingOffers(listingOffers) : setListingOffers(null);
        } catch (err) {
            console.error(err);
        }
    }

    const del = async () => {
        // deleteUsersListingsIds(accounts.address, "0xBDf761788135C7d7Aa76E6671f63462A07C53E2C0xefaa045741317bc0386d048432557b5393a1993f1");
        let lalala;
        for (let listing in listingOffers) {

        lalala = listing;
        if(new Date().getTime() >= listingOffers[listing].endDate){

        }

        }
        const offerId = await deleteListingOffer(listingId, lalala, listingOffers);
        await deleteUserOffer(accounts.address, listingId, offerId);
    }

    const calculateHoursAgo = (date) => {
        const dateNow = new Date().getTime();
        const hours = Math.floor(Math.abs(dateNow - date) / 36e5);
        if (hours >= 1) {
            return `${hours} hours ago`;
        }
        if (hours < 1) {
            return `${Math.floor(((dateNow - date) / 1000) / 60)} minutes ago`;
        }
    }

    useEffect(() => {
        initial();
        calculateHoursAgo();
    }, [offerUpdate])

    useEffect(() => {
        initial();
    }, [])

    useEffect(() => {
        if (timer) {
            setShowTimer(true);
        }
    }, [])

    return (
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="bid" role="tabpanel"
                 aria-labelledby="bid-tab">
                <div className="bid-history-overflow scroll">
                    <ul className="bid-history-list">
                        {listingOffers !== null && Object.keys(listingOffers).length !== 0 ? Object.entries(listingOffers).map(item => (
                            <OffersItem key={item[1].date} showTimer={showTimer} item={item[1]}
                                        calculateHoursAgo={calculateHoursAgo}/>
                        )) : <p>Token has no offers</p>}
                    </ul>
                </div>
                <button onClick={del}>delete</button>
            </div>
        </div>
    );
};

export default OffersHistory;