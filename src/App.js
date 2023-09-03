import {useEffect, useState} from "react"
import $ from "jquery"

import {Routes, Route} from 'react-router-dom'
import Activity from './pages/Activity'
import AuthorProfile from './pages/AuthorProfile'
import Blog from './pages/Blog'
import BlogDetails from './pages/BlogDetails'
import Category from './pages/Category'
import Collections from './pages/Collections'
import CreateItem from './pages/CreateItem'
import Creators from './pages/Creators'
import Explore from './pages/Explore'
import Home from './pages/Home'
import LoginRegister from './pages/LoginRegister'
import MarketSingle from './pages/MarketSingle'
import NftLiveBidding from './pages/NftLiveBidding'
import Ranking from './pages/Ranking'
import LoginPage from "./Components/InnerPages/LoginPage"
import authContext, {AuthProvider} from "./context/AuthContext";
import useFetch from "./hooks/useFetchCollection";

import {Web3Auth} from "@web3auth/modal";
import {CHAIN_NAMESPACES, SafeEventEmitterProvider} from "@web3auth/base";
import {ethers} from "ethers";
import useFetchCollection from "./hooks/useFetchCollection";


const clientId = "BH88U3rXLQxiX_zAoGEHCUaP0wBlxC82MB3yvnqDU-EDeKBoH60Y8Il-O8tMzQTGI5fSYTbwGtJEGb-O-NO_OI4";

function App() {
    const [web3auth, setWeb3auth] = useState(null);
    const [provider, setProvider] = useState(null);

    const [data] = useFetchCollection(5, "0x217719Ba3b94bD9F054B23E49cEd95EB1B282101", ["0xe51a6d8a8766e0a95e1db5f856f0e5352afaa87e"], "getContractsTokenIds");

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        $(".menu-trigger").on("click", function () {
            $(".offcanvas-wrapper,.offcanvas-overly").addClass("active");
            return false;
        });
        $(".menu-close,.offcanvas-overly").on("click", function () {
            $(".offcanvas-wrapper,.offcanvas-overly").removeClass("active");
        });
    }, [])

    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/nft-marketplace" element={<Explore/>}/>
                    <Route path="/collections" element={<Collections/>}/>
                    <Route path="/blog" element={<Blog/>}/>

                    <Route path="/blog-details" element={<BlogDetails/>}/>
                    <Route path="/activity" element={<Activity/>}/>
                    <Route path="/ranking" element={<Ranking/>}/>
                    <Route path="/login-register" element={<LoginRegister/>}/>
                    <Route path="/author-profile" element={<AuthorProfile/>}/>
                    <Route path="/create-item" element={<CreateItem/>}/>
                    <Route path="/category" element={<Category/>}/>
                    <Route path="/creators" element={<Creators/>}/>
                    <Route path="/market-single" element={<MarketSingle/>}/>
                    <Route path="/nft-live-bidding" element={<NftLiveBidding/>}/>
                    <Route path="/connect-wallets" element={<LoginPage/>}/>

                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
