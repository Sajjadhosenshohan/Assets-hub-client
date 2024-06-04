
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useHR from "../../Hooks/useHR";
import Spinner from "../../Components/Spinner";
import useEmployee from "../../Hooks/useEmployee";
// import { useEffect, useState } from "react";
// import { Tooltip } from "react-tooltip";

const Nav = () => {
    const { loading, user, logOut } = useAuth();

    const { isHr, isHRLoading } = useHR();
    // console.log("nav", isHr)

    // console.log("nav",user?.displayName)

    const { isEmployee, isEmployeeLoading } = useEmployee();
    // console.log("nav", isHr)


    const normal = <>
        <li>
            <NavLink to="/" className={({ isActive }) => isActive && 'border-b-4 border-primary text-primary rounded-none'}>
                Home
            </NavLink>
        </li>

        <li>
            <NavLink to="/registerEmployee" className={({ isActive }) => isActive && 'border-b-4 border-primary text-primary rounded-none'}>
                Join as Employee
            </NavLink>
        </li>
        <li>
            <NavLink to="/registerHR" className={({ isActive }) => isActive && 'border-b-4 border-primary text-primary rounded-none'}>
                Join as HR Manager
            </NavLink>
        </li>
    </>


    const Employee = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => isActive && 'border-b-4 border-primary text-primary rounded-none'}>
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink to="/myAssets" className={({ isActive }) => isActive && 'border-b-4 border-primary text-primary rounded-none'}>
                    My Assets
                </NavLink>
            </li>
            <li>
                <NavLink to="/myTeam" className={({ isActive }) => isActive && 'border-b-4 border-primary text-primary rounded-none'}>
                    My Team
                </NavLink>
            </li>
            <li>
                <NavLink to="/requestForAssets" className={({ isActive }) => isActive && 'border-b-4 border-primary text-primary rounded-none'}>
                    Request for an Asset
                </NavLink>
            </li>
        </>
    );

    const HR_Manager = (
        <>
            <li >
                <NavLink to="/" className={({ isActive }) => isActive && 'border-b-4 border-primary text-primary rounded-none'}>
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink to="/assetList" className={({ isActive }) => isActive && 'border-b-4 border-primary text-primary rounded-none'}>
                    Asset List
                </NavLink>
            </li>
            <li>
                <NavLink to="/addAnAsset" className={({ isActive }) => isActive && 'border-b-4 border-primary text-primary rounded-none'}>
                    Add an Asset
                </NavLink>
            </li>
            <li>
                <NavLink to="/allRequests" className={({ isActive }) => isActive && 'border-b-4 border-primary text-primary rounded-none'}>
                    All Request
                </NavLink>
            </li>
            <li>
                <NavLink to="/customRequestList" className={({ isActive }) => isActive && 'border-b-4 border-primary text-primary rounded-none'}>
                    Custom Request List
                </NavLink>
            </li>
            <li>
                <NavLink to="/myEmployeeList" className={({ isActive }) => isActive && 'border-b-4 border-primary text-primary rounded-none'}>
                    My Employee List
                </NavLink>
            </li>
            <li>
                <NavLink to="/addAnEmployee" className={({ isActive }) => isActive && 'border-b-4 border-primary text-primary rounded-none'}>
                    Add an Employee
                </NavLink>
            </li>
        </>
    );

    if (isHRLoading || isEmployeeLoading && loading) return <Spinner></Spinner>

    return (
        <>

            {/* for employee */}

            <div className="navbar  bg-white  py-2 rounded-lg">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden pr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className=" menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow  rounded-box w-52 dark:text-gray-800 bg-white">
                            {
                                !user && normal
                            }
                            {
                                isEmployee && Employee
                            }
                            {
                                isHr && HR_Manager
                            }
                        </ul>
                    </div>
                    <Link to='/' className="justify-center flex items-center ">
                        <div>
                            <img className="w-8 h-8 md:w-16 md:h-16 " src={'https://i.ibb.co/kytcV01/360-F-505617309-NN1-CW7di-Nm-GXJf-Micp-Y9e-XHKV4sqz-O5-H-removebg-preview-1.png'} alt="" />
                        </div>

                        <span className=" dark:text-primary uppercase">my-assets</span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1  dark:text-gray-800 ">
                        {
                            !user && normal
                        }
                        {
                            isEmployee && Employee
                        }
                        {
                            isHr && HR_Manager
                        }
                    </ul>
                </div>

                <div className="navbar-end">

                    <div className="flex justify-center items-center gap-2">

                        {
                            user ? <>
                                <div className="mr-2">
                                    <NavLink to="/profile" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none  bg-secondary  font-bold my-anchor-element-classHome' : 'font-bold my-anchor-element-classHome'}>
                                        Profile
                                    </NavLink>
                                </div>

                                <h2>{user?.displayName || "Name not found"}</h2>

                                <div className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">

                                        <img className="my-anchor-element-class" src={user?.photoURL || "https://i.ibb.co/fYRGNg6/profile.jpg"}

                                            alt="User avatar"
                                        />
                                    </div>
                                </div>

                                <button onClick={logOut} className="font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary text-center">Logout</button>
                            </> : <>
                                <Link to='/loginHR' >
                                    <button className="font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary text-center">Login</button>
                                </Link>
                            </>
                        }

                    </div>
                </div>
            </div>


            {/* HR manager */}
            {/* {
                isHr && <div className="navbar  bg-[rgb(204,138,0)]  py-2 rounded-lg">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden pr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className=" menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow  rounded-box w-52 dark:text-gray-800 bg-[rgb(204,138,0)]">
                                {HR_Manager}
                            </ul>
                        </div>
                        <Link to='/' className="justify-center flex items-center lg:font-bold  ml-1 lg:text-3xl ">
                            <div>
                                <img className="w-8 h-8 md:w-16 md:h-16 " src={'https://i.ibb.co/cxNhgQR/employee.jpg'} alt="" />
                            </div>
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 dark:text-gray-800 bg-[rgb(204,138,0)]">
                            {HR_Manager}
                        </ul>
                    </div>

                    <div className="navbar-end">

                        <div className="flex justify-center items-center gap-2">

                            <div className="mr-2">
                                <NavLink to="/profile" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none  bg-secondary  font-bold my-anchor-element-classHome' : 'font-bold my-anchor-element-classHome'}>
                                    Profile
                                </NavLink>
                            </div>

                            <h2>{user?.displayName}</h2>

                            <div className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">

                                    <img className="my-anchor-element-class" src={user?.photoURL || "https://i.ibb.co/fYRGNg6/profile.jpg"}

                                        alt="User avatar"
                                    />
                                </div>
                            </div>

                            <button onClick={logOut} className="font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary text-center">Logout</button>

                        </div>
                    </div>
                </div>
            } */}

        </>
    );
};

export default Nav;