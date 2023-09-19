import React from 'react';
import Countdown from "react-countdown";

const OffersItem = ({showTimer, item, calculateHoursAgo}) => {

    const calculateTimeLeft = (endDate) => {
        return (Math.abs(endDate - new Date().getTime()));
    }

    return (
        <li>
            <div className="bid-history-item">
                <div className="highest-bid-avatar">
                    <div className="thumb"><img
                        src="assets/img/others/heighest_avatar.png" alt=""/>
                    </div>
                    <div className="content">
                        <h5 className="title"><a href="/author-profile">{item.account}</a></h5>
                        {showTimer ? <div style={{color: "white"}}>
                            <p>Offer time left:</p> <Countdown
                            date={Date.now() + calculateTimeLeft(item.endDate)}/></div> : ""}
                    </div>
                </div>
                <div className="bid-history-info">
                    <span>{calculateHoursAgo(item.date)}</span>
                    <h6 className="title">{item.price} Eth</h6>
                </div>
            </div>
        </li>
    );
};

export default OffersItem;