import About from "../../Components/About";
import Banner from "./Banner";
import PackageSection from "./PackageSection";

const Home = () => {
    return (
        <div>
            <div className="h-[600px] mt-12 mb-24 overflow-hidden">
                <Banner></Banner>
            </div>
            <About></About>
            <PackageSection></PackageSection>
        </div>
    );
};

export default Home;