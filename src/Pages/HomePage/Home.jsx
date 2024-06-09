import About from "../../Components/About";
import MyAssets from "../Employee/MyAssets/MyAssets";
import Top_five_pending_request from "../HR_Manager/All_Requests/Top_five_pending_request";
import Limited_stock_items from "../HR_Manager/Limited_stock_items/Limited_stock_items";
import Stats_chart from "../HR_Manager/Stats_chart/Stats_chart";
import TopRequestedItems from "../HR_Manager/TopRequestedItems/TopRequestedItems";
import Banner from "./Banner";
import MyMonthlyRequests from "./MyMonthlyRequests";
import PackageSection from "./PackageSection";

const Home = () => {
    return (
        <div>
            <div className="h-[600px] mt-12 mb-24 overflow-hidden">
                <Banner></Banner>
            </div>
            <About></About>
            <PackageSection></PackageSection>
            {/* my pending assets */}
            <MyAssets heading="My pending requests"></MyAssets>
            <MyMonthlyRequests></MyMonthlyRequests>

            {/* for HR  */}
            <Top_five_pending_request></Top_five_pending_request>
            <TopRequestedItems></TopRequestedItems>
            <Limited_stock_items></Limited_stock_items>
            <Stats_chart></Stats_chart>
        </div>
    );
};

export default Home;