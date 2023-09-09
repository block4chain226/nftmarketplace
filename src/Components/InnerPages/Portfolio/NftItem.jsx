import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import useUserWriteToDb from "../../../hooks/useUserWriteToDb";
import AuthContext from "../../../context/AuthContext";
import useFetchFromDb from "../../../hooks/useFetchFromDb";

const NftItem = ({item}) => {

    const {accounts} = useContext(AuthContext);

    const {writeUsersListedTokensDB, deleteUserListedTokenDB, writeOrUpdateUserListedTokensDB} = useUserWriteToDb();
    const {getUserContractListedTokens} = useFetchFromDb();

    const [listed, setListed] = useState(false);

    const listToken = async (e) => {
        e.preventDefault();
        writeOrUpdateUserListedTokensDB(accounts, item.contract, item.tokenId, getUserContractListedTokens);
        setTimeout(() => {
            setListed(true);
        }, 300)
    }

    const isListed = async () => {
        const allContractListedTokens = await getUserContractListedTokens(accounts, item.contract);
        if (allContractListedTokens) {
            console.log("=>(NftItem.jsx:24) allContractListedTokens", allContractListedTokens?.tokens);
            const result = allContractListedTokens.tokens.includes(item?.tokenId);
            setListed(result);
        }
    }

    const unListToken = async (e) => {
        e.preventDefault();
        deleteUserListedTokenDB(accounts, item.contract, item.tokenId);
        setTimeout(() => {
            setListed(false);
        }, 300)
    }

    useEffect(() => {
        isListed();
    }, [listed]);
    return (
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

                <div className="collection-item-thumb">
                    <Link to={`/market-single/${item.tokenId}`} state={item}><img src={item.metadata.image}
                                                                                  key={item.tokenId}
                                                                                  data-category={item.category}
                                                                                  data-contract={item.contract}
                                                                                  alt=""/></Link>
                </div>
                <div className="collection-item-content">
                    <h5 className="title"><a href="/market-single">{item.metadata.name}</a> <span
                        className="price">5.4 ETH</span></h5>
                </div>
                <div className="collection-item-bottom">
                    <ul>
                        {!listed ? <li className="bid"><a href="/market-single" onClick={(e) => listToken(e)}
                                                          className="btn">List</a></li> :
                            <li className="bid"><a href="/market-single" onClick={(e) => unListToken(e)}
                                                   className="btn">Unlist</a></li>
                        }

                        <li className="wishlist"><a
                            href="/login-register">59</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NftItem;