
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const img1 = 'https://i.ibb.co/DbJbQLn/pexels-kindelmedia-7688460.jpg';
const img2 = 'https://i.ibb.co/q0tM1j8/pexels-seven11nash-380769.jpg';


const Banner = () => {
    return (
        <div className="">
            <Carousel className=" ">
                <div className="border-red-500 h-full">
                    <img className="h-full" src={img2} />
                </div>
                <div className="border-red-500 h-full">
                    <img className="h-full" src={img2} />
                </div>

            </Carousel>
        </div>
    );
};

export default Banner;