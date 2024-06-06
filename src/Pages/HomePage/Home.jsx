import About from "../../Components/About";
import MyAssets from "../Employee/MyAssets/MyAssets";
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
        </div>
    );
};

export default Home;