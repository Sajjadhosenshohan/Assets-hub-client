import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useUserData from "../Hooks/useHRData";
import Spinner from "../Components/Spinner";



const HrRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const {userData,isLoading} = useUserData();
    const location = useLocation();

    if (loading || isLoading) {
        return <Spinner></Spinner>
    }

    if (user && userData) {
        return children;
    }

    return <Navigate to="/registerHR" state={location?.state?.pathName}></Navigate>

};

export default HrRoute;