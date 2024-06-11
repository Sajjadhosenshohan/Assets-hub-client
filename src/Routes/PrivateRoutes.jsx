import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log(location?.state?.pathName)
    if (loading) {
        return <progress className="progress w-56"></progress>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={location?.state?.pathName} replace></Navigate>
};

export default PrivateRoutes;