import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Spinner from "../../Components/Spinner";
import useEmployeeData from "../../Hooks/useEmployeeData";
import useUserData from "../../Hooks/useHRData";

const Nav = () => {
    const { loading, user, logOut } = useAuth();
    // hr hook
    const { userData: Hr_data, isLoading: isHRLoading } = useUserData();
    // employee hook
    const { userDataEmployee, isLoading: isEmployeeLoading } = useEmployeeData();

    const renderNormalLinks = () => (
        <>
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
    );

    const renderEmployeeLinks = () => (
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

    const renderHRManagerLinks = () => (
        <>
            <li>
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
                    All Requests
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

    if (isHRLoading || isEmployeeLoading || loading) {
        return <Spinner />;
    }

    const renderLinks = () => {
        if (user) {
            if (Hr_data) return renderHRManagerLinks();
            if (userDataEmployee) return renderEmployeeLinks();
        }
        return renderNormalLinks();
    };

    const renderUserProfile = () => {
        if (user) {
            return (
                <>
                    <div className="mr-2">
                        <NavLink to="/profile" className={({ isActive }) => isActive ? 'border-b-4 border-primary text-primary rounded-none bg-secondary font-bold' : 'font-bold'}>
                            Profile
                        </NavLink>
                    </div>
                    
                    <h2>{user?.displayName || "Name not found"}</h2>

                    <div className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={user?.photoURL || "https://i.ibb.co/fYRGNg6/profile.jpg"} alt="User avatar" />
                        </div>
                    </div>
                    <button onClick={logOut} className="font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary text-center">
                        Logout
                    </button>
                </>
            );
        } else {
            return (
                <Link to='/loginHR'>
                    <button className="font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary text-center">
                        Login
                    </button>
                </Link>
            );
        }
    };

    const renderLogo = () => {
        const logoUrl = Hr_data?.companyLogo || userDataEmployee?.companyLogo || 'https://i.ibb.co/kytcV01/360-F-505617309-NN1-CW7di-Nm-GXJf-Micp-Y9e-XHKV4sqz-O5-H-removebg-preview-1.png';
        return <img className="w-8 h-8 md:w-16 md:h-16" src={logoUrl} alt="Company Logo" />;
    };

    return (
        <div className="navbar bg-white py-2 rounded-lg">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden pr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow rounded-box w-52 dark:text-gray-800 bg-white">
                        {renderLinks()}
                    </ul>
                </div>
                <Link to='/' className="justify-center flex items-center">
                    {renderLogo()}
                    <span className="dark:text-primary uppercase ml-1">my-assets</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 dark:text-gray-800">
                    {renderLinks()}
                </ul>
            </div>
            <div className="navbar-end flex items-center gap-2">
                {renderUserProfile()}
            </div>
        </div>
    );
};

export default Nav;
