import About from "../../Components/About";
import MyAssets from "../Employee/MyAssets/MyAssets";
import Top_five_pending_request from "../HR_Manager/All_Requests/Top_five_pending_request";
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
        </div>
    );
};

export default Home;