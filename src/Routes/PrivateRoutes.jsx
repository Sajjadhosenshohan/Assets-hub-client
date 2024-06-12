import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useEmployeeData from "../Hooks/useEmployeeData";
import Spinner from "../Components/Spinner";



const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const { userDataEmployee } = useEmployeeData();

    const location = useLocation();

    if (loading) {
        return <Spinner />;
    }

    if (!user) {
        return <Navigate to="/login" state={location?.state?.pathname} />;
    }

    if (user && userDataEmployee?.affiliate === "no") {
        return (
            <div className="my-52 text-center text-3xl text-red-600">
                Please contact your HR to get affiliated with a company.
            </div>
        );
    }
    
    return children;
};

export default PrivateRoutes;
