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

    if (!user) {
        return <Navigate to="/login" state={{ from: location}} replace/>;
    }

    if (user && userData) {
        return children;
    }

    return null;
};

export default HrRoute;
