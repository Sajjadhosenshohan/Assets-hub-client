import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/HomePage/Home";
import MyAssets from "../Pages/Employee/MyAssets/MyAssets";
import MyTeam from "../Pages/Employee/MyTeam/MyTeam";
import RequestForAnAssets from "../Pages/Employee/RequestForAsset/RequestForAnAssets";
import AssetList from "../Pages/HR_Manager/AssetList/AssetList";
import AddAnAsset from "../Pages/HR_Manager/AddAnAsset/AddAnAsset";
import AllRequests from "../Pages/HR_Manager/All_Requests/AllRequests";
import CustomRequestsList from "../Pages/HR_Manager/Custom_Requests_List/CustomRequestsList";
import MyEmployeeList from "../Pages/HR_Manager/My_Employee_List/MyEmployeeList";
import AddAnEmployee from "../Pages/HR_Manager/Add_an_Employee/AddAnEmployee";
import RegisterEmployee from "../Pages/Employee/Join_as_employee/RegisterEmployee";
import LoginEmployee from "../Pages/Employee/Join_as_employee/LoginEmployee";
import LoginHR from "../Pages/HR_Manager/LoginHR";
import RegisterHR from "../Pages/HR_Manager/RegisterHR";
import Payment from "../Pages/HR_Manager/Payment/Payment";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/profile",
                element: <UpdateProfile></UpdateProfile>
            },

            // normal employee
            {
                path: "/myAssets",
                element: <MyAssets></MyAssets>
            },
            {
                path: "/myTeam",
                element: <MyTeam></MyTeam>
            },
            {
                path: "/requestForAssets",
                element: <RequestForAnAssets></RequestForAnAssets>
            },

            // for hr manager

            {
                path: "/assetList",
                element: <AssetList></AssetList>
            },
            {
                path: "/addAnAsset",
                element: <AddAnAsset></AddAnAsset>
            },
            {
                path: "/allRequests",
                element: <AllRequests></AllRequests>
            },

            {
                path: "/customRequestList",
                element: <CustomRequestsList></CustomRequestsList>
            },
            {
                path: "/myEmployeeList",
                element: <MyEmployeeList></MyEmployeeList>
            },
            {
                path: "/addAnEmployee",
                element: <AddAnEmployee></AddAnEmployee>
            },
            {
                path: "/payment",
                element: <Payment></Payment>
            },

            // for employee
            {
                path: "/registerEmployee",
                element: <RegisterEmployee></RegisterEmployee>
            },
            {
                path: "/loginEmployee",
                element: <LoginEmployee></LoginEmployee>
            },
            // for Hr manager

            {
                path: "/registerHR",
                element: <RegisterHR></RegisterHR>
            },
            {
                path: "/loginHR",
                element: <LoginHR></LoginHR>
            },

        ]
    },

]);


export default router;