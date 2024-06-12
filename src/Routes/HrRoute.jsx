import { Navigate, useLocation} from "react-router-dom";
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

    if (!user) {
        return <Navigate to="/login" state={location?.pathname} />;
    }

    if (user && userData?.payment === "yes") {
        return children;
    }

    if (user && userData?.payment === "no") {
        return <Navigate to="/payment" state={location?.pathname} />;
    }

    return null
};

export default HrRoute;
