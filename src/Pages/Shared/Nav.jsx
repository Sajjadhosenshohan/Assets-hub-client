
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
// import { useEffect, useState } from "react";
// import { Tooltip } from "react-tooltip";

const Nav = ({ navHide }) => {
    const { logout, user, logOut } = useAuth();

    console.log(navHide)


    const normal = <>
        <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none  bg-secondary  font-bold my-anchor-element-classHome' : 'font-bold my-anchor-element-classHome'}>
                Home
            </NavLink>
        </li>

        <li>
            <NavLink to="/registerEmployee" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none  bg-secondary  font-bold my-anchor-element-class2' : 'font-bold my-anchor-element-class2'}>
                Join as Employee
            </NavLink>
        </li>
        <li>
            <NavLink to="/registerHR" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none  bg-secondary  font-bold my-anchor-element-class2' : 'font-bold my-anchor-element-class2'}>
                Join as HR Manager
            </NavLink>
        </li>
    </>


    const Employee = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none  bg-secondary  font-bold my-anchor-element-classHome' : 'font-bold my-anchor-element-classHome'}>
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink to="/myAssets" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none  bg-secondary  font-bold my-anchor-element-class3' : 'font-bold my-anchor-element-class3'}>
                    My Assets
                </NavLink>
            </li>
            <li>
                <NavLink to="/myTeam" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none  bg-secondary  font-bold my-anchor-element-class4' : 'font-bold my-anchor-element-class4'}>
                    My Team
                </NavLink>
            </li>
            <li>
                <NavLink to="/requestForAssets" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none  bg-secondary  font-bold my-anchor-element-class4' : 'font-bold my-anchor-element-class4'}>
                    Request for an Asset
                </NavLink>
            </li>
        </>
    );

    const HR_Manager = (
        <>
            <li className="bg-[rgb(204,138,0)]">
                <NavLink to="/" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none  bg-[rgb(204,138,0)]  font-bold my-anchor-element-classHome' : 'font-bold my-anchor-element-classHome'}>
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink to="/assetList" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none  bg-secondary  font-bold my-anchor-element-class3' : 'font-bold my-anchor-element-class3'}>
                    Asset List
                </NavLink>
            </li>
            <li>
                <NavLink to="/addAnAsset" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none  bg-secondary  font-bold my-anchor-element-class4' : 'font-bold my-anchor-element-class4'}>
                    Add an Asset
                </NavLink>
            </li>
            <li>
                <NavLink to="/allRequests" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none  bg-secondary  font-bold my-anchor-element-class4' : 'font-bold my-anchor-element-class4'}>
                    All Request
                </NavLink>
            </li>
            <li>
                <NavLink to="/customRequestList" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none  bg-secondary  font-bold my-anchor-element-class4' : 'font-bold my-anchor-element-class4'}>
                    Custom Request List
                </NavLink>
            </li>
            <li>
                <NavLink to="/myEmployeeList" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none  bg-secondary  font-bold my-anchor-element-class4' : 'font-bold my-anchor-element-class4'}>
                    My Employee List
                </NavLink>
            </li>
            <li>
                <NavLink to="/addAnEmployee" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none  bg-secondary  font-bold my-anchor-element-class4' : 'font-bold my-anchor-element-class4'}>
                    Add an Employee
                </NavLink>
            </li>
        </>
    );


    return (
        <>
            <div className="navbar  bg-secondary  shadow-lg py-2 rounded-lg">

                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden pr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className=" menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow  rounded-box w-52 dark:text-gray-800 bg-white">
                            {normal}
                        </ul>
                    </div>
                    <Link to='/' className="justify-center flex items-center lg:font-bold  ml-1 lg:text-3xl ">

                        <div>
                            <img className="w-8 h-8 md:w-16 md:h-16 " src={'https://i.ibb.co/kytcV01/360-F-505617309-NN1-CW7di-Nm-GXJf-Micp-Y9e-XHKV4sqz-O5-H-removebg-preview-1.png'} alt="" />
                        </div>


                        <span className=" dark:text-primary uppercase">my-assets</span>


                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 dark:text-gray-800 ">
                        {normal}
                    </ul>
                </div>



                <div className="navbar-end">

                    {
                        user ? <div className="flex justify-center items-center gap-2">
                            <div className="dropdown dropdown-end ">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">

                                        <img className="my-anchor-element-class" src={user?.photoURL || "https://i.ibb.co/fYRGNg6/profile.jpg"}

                                            alt="User avatar"


                                        />

                                        {/* <Tooltip
                                            anchorSelect=".my-anchor-element-class"
                                            content={((user?.displayName) || 'Name not found')}

                                            style={{ backgroundColor: "#23BE0A", color: "white" }}
                                        /> */}

                                    </div>
                                </div>

                                {/* ul */}
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-4 flex gap-2 shadow  rounded-box w-52 bg-secondary">
                                    <Link to={`/myAttempted`}>
                                        <li className="border-2 p-2 border-primary text-primary rounded-md font-bold">
                                            My submitted
                                        </li>
                                    </Link>
                                    <li className="rounded-md border-2 border-primary text-primary  font-bold" onClick={logOut}><a>Logout</a></li>
                                </ul>


                            </div>

                            {/* <button onClick={logout} className="font-medium text-white text-sm md:text-xl md:pb-2 md:px-4 py-1 px-2 rounded-lg bg-primary text-center">
                                Logout
                            </button> */}
                        </div>
                            :
                            <div className="flex space-x-2">
                                <Link to='/loginEmployee' >
                                    <button className="font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary text-center">Employee  Login</button>
                                </Link>

                                <Link to='/loginHR' >
                                    <button className="font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary text-center">HR manager  Login</button>
                                </Link>

                                {/* <Link to='/registerEmployee' >
                                    <button className="font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary text-center">Register</button>
                                </Link> */}
                            </div>
                    }
                </div>
            </div>

            {/* for employee */}

            <div className="navbar  bg-white  py-2 rounded-lg">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden pr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className=" menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow  rounded-box w-52 dark:text-gray-800 bg-white">
                            {Employee}
                        </ul>
                    </div>
                    <Link to='/' className="justify-center flex items-center lg:font-bold  ml-1 lg:text-3xl ">
                        <div>
                            <img className="w-8 h-8 md:w-16 md:h-16 " src={'https://i.ibb.co/cxNhgQR/employee.jpg'} alt="" />
                        </div>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 dark:text-gray-800 ">
                        {Employee}
                    </ul>
                </div>

                <div className="navbar-end">

                    <div className="flex justify-center items-center gap-2">

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

                        <button onClick={logout}  className="font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary text-center">Logout</button>

                    </div>
                </div>
            </div>


            {/* HR manager */}
            <div className="navbar  bg-[rgb(204,138,0)]  py-2 rounded-lg">
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

                        <button onClick={logout} className="font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary text-center">Logout</button>

                    </div>
                </div>
            </div>

        </>
    );
};

export default Nav;