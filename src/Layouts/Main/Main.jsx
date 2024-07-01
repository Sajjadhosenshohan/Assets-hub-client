import { Outlet, useLocation } from "react-router-dom";
import Nav from "../../Pages/Shared/Nav";
import Footer from "../../Pages/Shared/Footer";

const Main = () => {
    const location = useLocation();

    const navHide = location.pathname.includes('/');
    return (
        <div>
            <Nav navHide={navHide}></Nav>
            <div className='max-w-6xl mx-auto p-5 min-h-[calc(100vh-80px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>

    );
};

export default Main;