import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useUserData from "../Hooks/useHRData";
import Spinner from "../Components/Spinner";

const HrRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { userData } = useUserData();
    const location = useLocation();

    if (loading) {
        return <Spinner />;
    }

    if (user && userData) {
        if (userData.payment === "yes") {
            return children;
        } else {
            return <Navigate to="/payment" state={{ from: location.pathname }} />;
        }
    }

    return <Navigate to="/registerHR" state={{ from: location.pathname }} />;
};

export default HrRoute;
