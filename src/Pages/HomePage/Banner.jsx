import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const img1 = "https://i.ibb.co/XyS5MsW/lycs-architecture-U2-BI3-GMn-SSE-unsplash.jpg"
const img2 = "https://i.ibb.co/GMtJ4TR/austin-distel-waw-Ef-Ydpkag-unsplash.jpg"

const Banner = () => {
    return (
        <div className='rounded-lg'>
            <Swiper className="mySwiper h-[500px]"
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {/* 1 */}
                <SwiperSlide>
                    <div className="hero h-full " style={{ backgroundImage: `url(${img1})` }}>
                        <div className="hero-overlay bg-opacity-50"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md space-y-6">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-400">
                                    Streamline Asset Management
                                </h1>
                                <p>
                                    XYZ's web app makes it easy for businesses to manage and track their assets efficiently.
                                </p>
                                <div>
                                    <NavLink to="/registerHR">
                                        <button className="font-medium text-white text-lg md:text-xl md:pb-2 md:px-4 py-1 px-2 rounded-lg bg-primary text-center">{`Join as HR Manager`}</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {/* 2 */}
                <SwiperSlide>
                    <div className="hero h-full" style={{ backgroundImage: `url(${img2})` }}>
                        <div className="hero-overlay bg-opacity-50"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md space-y-6">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-400">
                                    Track Employee Usage
                                </h1>
                                <p>
                                    Easily monitor how your employees are utilizing company assets with XYZ's solution.
                                </p>
                                <div>
                                    <NavLink to="/registerEmployee">
                                        <button className="font-medium text-white text-lg md:text-xl md:pb-2 md:px-4 py-1 px-2 rounded-lg bg-primary text-center">{`Join as an Employee`}</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {/* Add more slides if needed */}
            </Swiper>
        </div>
    );
};

export default Banner;
