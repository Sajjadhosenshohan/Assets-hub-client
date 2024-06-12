import { Helmet } from "react-helmet-async";
import About from "../../Components/About";
import useAuth from "../../Hooks/useAuth";
import useEmployeeData from "../../Hooks/useEmployeeData";
import useUserData from "../../Hooks/useHRData";
import TopFivePendingRequest from "../HR_Manager/All_Requests/Top_five_pending_request";
import LimitedStockItems from "../HR_Manager/Limited_stock_items/Limited_stock_items";
import StatsChart from "../HR_Manager/Stats_chart/Stats_chart";
import TopRequestedItems from "../HR_Manager/TopRequestedItems/TopRequestedItems";
import Banner from "./Banner";
import Contact from "./Contact";
import Feature from "./Feature";
import MyMonthlyRequests from "./MyMonthlyRequests";
import MyPendingRequest from "./MyPendingRequest";
import Newsletter from "./NewsLetter";
import PackageSection from "./PackageSection";
import PrivateRoutes from "../../Routes/PrivateRoutes";

const Home = () => {
    const { userData: HR_Manager } = useUserData();
    const { userDataEmployee } = useEmployeeData();
    const { user } = useAuth();

    console.log(userDataEmployee);

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>

            {!user && (
                <>
                    <div className="mt-12">
                        <Banner />
                    </div>
                    <About />
                    <PackageSection />
                </>
            )}

            {user && !HR_Manager && userDataEmployee?.affiliate === "no" && (
                <div className="my-52 text-center text-3xl text-red-600">
                    Please contact your HR to get affiliated with a company.
                </div>
            )}

            {user && !HR_Manager && userDataEmployee?.affiliate === "yes" && (
                <>
                    <PrivateRoutes><MyPendingRequest /></PrivateRoutes>
                    <PrivateRoutes><MyMonthlyRequests /></PrivateRoutes>
                    <PrivateRoutes><Newsletter /></PrivateRoutes>
                </>
            )}

            {user && HR_Manager?.payment === "yes" && (
                <>
                    <PrivateRoutes><TopFivePendingRequest /></PrivateRoutes>
                    <PrivateRoutes><TopRequestedItems /></PrivateRoutes>
                    <PrivateRoutes><LimitedStockItems /></PrivateRoutes>
                    <PrivateRoutes><StatsChart /></PrivateRoutes>
                    <PrivateRoutes><Feature /></PrivateRoutes>
                    <Contact />
                </>
            )}

            {user && HR_Manager && HR_Manager?.payment !== "yes" && (
                <div className="my-52 text-center text-3xl text-red-600">
                    Please buy your package.
                </div>
            )}
        </div>
    );
};

export default Home;
