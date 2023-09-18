import React, {useEffect, useState} from 'react';
import useFetchFromDb from "../../hooks/useFetchFromDb";

const OffersHistory = ({listingId, offerUpdate}) => {
    const {getListingOffers} = useFetchFromDb();
    const [listingOffers, setListingOffers] = useState({});

    useEffect(() => {
        initial();
        calculateHoursAgo();
    }, [offerUpdate])

    const initial = async () => {
        const listingOffers = await getListingOffers(listingId);
        setListingOffers(listingOffers);
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

    return (
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="bid" role="tabpanel"
                 aria-labelledby="bid-tab">
                <div className="bid-history-overflow scroll">
                    <ul className="bid-history-list">
                        {Object.entries(listingOffers).map(item => (
                            <li>
                                <div className="bid-history-item">
                                    <div className="highest-bid-avatar">
                                        <div className="thumb"><img
                                            src="assets/img/others/heighest_avatar.png" alt=""/>
                                        </div>
                                        <div className="content">
                                            <h5 className="title"><a href="/author-profile">{item[1].account}</a></h5>
                                        </div>
                                    </div>
                                    <div className="bid-history-info">
                                        <span>{calculateHoursAgo(item[1].date)}</span>
                                        <h6 className="title">{item[1].price} Eth</h6>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OffersHistory;