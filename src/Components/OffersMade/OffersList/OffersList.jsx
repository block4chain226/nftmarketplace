import React from 'react';
import cl from "./OffersList.module.css";
import OfferItem from "../OfferItem/OfferItem";
import {useParams} from "react-router-dom";
import useFetchFromDb from "../../../hooks/useFetchFromDb";
import useUserWriteToDb from "../../../hooks/useUserWriteToDb";

const OffersList = () => {
    const {account} = useParams();

    const {getAllUserOffers} = useFetchFromDb();
    const {writeUsersListingIds} = useUserWriteToDb();

    const write = async (e) => {
        e.preventDefault();
        await writeUsersListingIds(account, "0xBDf761788135C7d7Aa76E6671f63462A07C53E2C0xefaa045741317bc0386d048432557b5393a1993f2");
    }

    const getAllOffers = async (e) => {
        e.preventDefault();
        await getAllUserOffers(account);
    }
    return (
        <div className={cl.table}>
            <OfferItem/>
            <button onClick={(e) => getAllOffers(e)}>ok</button>
            <button onClick={(e) => write(e)}>write</button>
        </div>
    );
};

export default OffersList;