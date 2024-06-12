import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Spinner from "../Components/Spinner";

const PrivateRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log(location?.state?.pathName)
    if (loading) {
        return <Spinner></Spinner>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={location?.state?.pathName}></Navigate>
};

export default PrivateRoutes;