import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/HomePage/Home";
import MyAssets from "../Pages/Employee/MyAssets/MyAssets";
import MyTeam from "../Pages/Employee/MyTeam/MyTeam";
import RequestForAnAssets from "../Pages/Employee/RequestForAsset/RequestForAnAssets";
import AssetList from "../Pages/HR_Manager/AssetList/AssetList";
import AddAnAsset from "../Pages/HR_Manager/AddAnAsset/AddAnAsset";
import AllRequests from "../Pages/HR_Manager/All_Requests/AllRequests";
import MyEmployeeList from "../Pages/HR_Manager/My_Employee_List/MyEmployeeList";
import AddAnEmployee from "../Pages/HR_Manager/Add_an_Employee/AddAnEmployee";
import RegisterEmployee from "../Pages/Employee/Join_as_employee/RegisterEmployee";
import LoginHR from "../Pages/HR_Manager/LoginHR";
import RegisterHR from "../Pages/HR_Manager/RegisterHR";
import Payment from "../Pages/HR_Manager/Payment/Payment";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import UpdateAsset from "../Pages/HR_Manager/AssetList/UpdateAsset";
import AssetDetails from "../Pages/Employee/Pdf/AssetDetails";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../Pages/ErrorPage";
import HrRoute from "./HrRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/profile",
                element: <PrivateRoutes><UpdateProfile></UpdateProfile></PrivateRoutes>
            },

            // normal employee
            {
                path: "/myAssets",
                element: <PrivateRoutes><MyAssets></MyAssets></PrivateRoutes>
            },
            {
                path: "/myTeam",
                element: <PrivateRoutes><MyTeam></MyTeam></PrivateRoutes>
            },
            {
                path: "/requestForAssets",
                element:<PrivateRoutes><RequestForAnAssets></RequestForAnAssets> </PrivateRoutes>
            },
            {
                path: '/asset/:id',
                element: <PrivateRoutes><AssetDetails></AssetDetails></PrivateRoutes> 
              },

            // for hr manager

            {
                path: "/assetList",
                element: <HrRoute><AssetList></AssetList></HrRoute>
            },
            {
                path: "/addAnAsset",
                element: <HrRoute><AddAnAsset></AddAnAsset></HrRoute>
            },
            {
                path: "/allRequests",
                element: <HrRoute><AllRequests></AllRequests></HrRoute>
            },

            {
                path: "/myEmployeeList",
                element: <HrRoute><MyEmployeeList></MyEmployeeList></HrRoute>,
            },
            {
                path: "/addAnEmployee",
                element: <HrRoute><AddAnEmployee></AddAnEmployee></HrRoute>,
            },
            {
                path: "/payment",
                element: <Payment></Payment>
            },
            {
                path: "/update/:id",
                element: <HrRoute><UpdateAsset></UpdateAsset></HrRoute>,
                loader: async ({ params }) => await fetch(`https://my-assets-server.vercel.app/assetOne/${params.id}`)
            },

            // for employee
            {
                path: "/registerEmployee",
                element: <RegisterEmployee></RegisterEmployee>
            },
            
            // for Hr manager

            {
                path: "/registerHR",
                element: <RegisterHR></RegisterHR>
            },
            {
                path: "/login",
                element: <LoginHR></LoginHR>
            },

        ]
    },

]);


export default router;