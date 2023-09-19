import {useEffect} from "react"
import $ from "jquery"

import {Route, Routes} from 'react-router-dom'
import Activity from './pages/Activity'
import AuthorProfile from './pages/AuthorProfile'
import Blog from './pages/Blog'
import BlogDetails from './pages/BlogDetails'
import Category from './pages/Category'
import Collections from './pages/Collections'
import CreateItem from './pages/CreateItem'
import Creators from './pages/Creators'
import Home from './pages/Home'
import LoginRegister from './pages/LoginRegister'
import MarketSingle from './pages/MarketSingle'
import NftLiveBidding from './pages/NftLiveBidding'
import Ranking from './pages/Ranking'
import LoginPage from "./Components/InnerPages/LoginPage"
import {AuthProvider} from "./context/AuthContext";
import {AdminWalletProvider} from "./context/AdminWalletContext";
import CollectionItems from "./Components/InnerPages/Listing/CollectionItems";
import SingleMarket from "./Components/InnerPages/marketsingle/SingleMarket";
import NftMarket from "./Components/Explore/NftMarket";
import NftSingle from "./Components/InnerPages/Portfolio/NftSingle";
import CurrentCollectionItems from "./Components/InnerPages/Portfolio/CurrentCollectionItems";


const clientId = "BH88U3rXLQxiX_zAoGEHCUaP0wBlxC82MB3yvnqDU-EDeKBoH60Y8Il-O8tMzQTGI5fSYTbwGtJEGb-O-NO_OI4";

function App() {

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
                <AdminWalletProvider>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/nft-marketplace" element={<NftMarket/>}/>
                        <Route path="/collections" element={<Collections/>}/>
                        <Route path="/blog" element={<Blog/>}/>
                        <Route path="/blog-details" element={<BlogDetails/>}/>
                        <Route path="/activity" element={<Activity/>}/>
                        <Route path="/ranking" element={<Ranking/>}/>
                        <Route path="/login-register" element={<LoginRegister/>}/>
                        <Route path="/author-profile" element={<AuthorProfile/>}/>
                        <Route path="/collection-items/:accounts/:contract" element={<CurrentCollectionItems/>}/>
                        <Route path="/create-item" element={<CreateItem/>}/>
                        <Route path="/category" element={<Category/>}/>
                        <Route path="/creators" element={<Creators/>}/>
                        {/*<Route path="/author-profile" element={<AuthorProfile/>}/>*/}
                        <Route path="/collection-items" element={<CollectionItems/>}/>
                        <Route path="/collection-items/:token" element={<CollectionItems/>}/>
                        <Route path="/single-market/:listingId" element={<SingleMarket/>}/>
                        <Route path="/nft-info/:tokenId/:contract" element={<NftSingle/>}/>
                        {/*<Route path="/market-single" element={<MarketSingle/>}/>*/}
                        <Route path="/market-single/:tokenId" element={<MarketSingle/>}/>
                        <Route path="/nft-live-bidding" element={<NftLiveBidding/>}/>
                        <Route path="/connect-wallets" element={<LoginPage/>}/>
                    </Routes>
                </AdminWalletProvider>
            </AuthProvider>
        </div>
    );
}
//TODO UsersOffers => account => listingId: { listingId, date, price } , maybe need to initialize date on frontEnd and send to all needed functions +
//TODO offerPeriod: date, endDate, then selling owner enter site, we get endDate from UsersOffers/bestOffer, if date.now >= endDate => cancelOffer, timer tick on site, when 0 => deleteOffer, delete userOffer
//TODO list modal with right ether parsing
//TODO listingId+blocktimestamp => parse listingId-blocktimestamp

export default App;
