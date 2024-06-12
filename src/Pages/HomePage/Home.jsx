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
    const { userData: HR_Manager } = useUserData()
    const { userDataEmployee } = useEmployeeData()
    const { user } = useAuth()

    return (
        <div>

            <Helmet>
                <title>Home</title>
            </Helmet>

            {/* If the user is not logged in */}
            {!user && (
                <>
                    <div className="mt-12">
                        <Banner />
                    </div>
                    <About />
                    <PackageSection />
                </>
            )}

            {/* If the user is logged in as an Employee */}
            {user && userDataEmployee && (
                <>
                    <PrivateRoutes><MyPendingRequest /></PrivateRoutes>
                    <PrivateRoutes><MyMonthlyRequests /></PrivateRoutes>
                    <PrivateRoutes><Newsletter /></PrivateRoutes>
                </>
            )}

            {/* If the user is logged in as an HR Manager */}
            {user && HR_Manager && (
                <>
                    <PrivateRoutes><TopFivePendingRequest /></PrivateRoutes>
                    <PrivateRoutes><TopRequestedItems /></PrivateRoutes>
                    <PrivateRoutes><LimitedStockItems /></PrivateRoutes>
                    <PrivateRoutes><StatsChart /></PrivateRoutes>
                    <PrivateRoutes><Feature /></PrivateRoutes>
                    <Contact />
                </>
            )}

            {/* If the user is logged in but not associated with any company */}
            {user && !HR_Manager && !userDataEmployee && (
                <div className="mt-12">
                    <Banner />
                    <About />
                    <PackageSection />
                    <div className="mt-6 text-center text-red-600">
                        Please contact your HR to get affiliated with a company.
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
