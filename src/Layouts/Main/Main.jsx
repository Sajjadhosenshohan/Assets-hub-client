import { Outlet } from "react-router-dom";
import Nav from "../../Pages/Shared/Nav";
import Footer from "../../Pages/Shared/Footer";

const Main = () => {
    return (
        <div>
            <Nav></Nav>
            <div className='max-w-6xl mx-auto'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>

    );
};

export default Main;