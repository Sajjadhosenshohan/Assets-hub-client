import Heading from "./Heading";
const img1 = "https://i.ibb.co/g7330fX/2150951359.jpg";

const img2 = "https://i.ibb.co/YtNpft2/2151003713.jpg";

const img3 = "https://i.ibb.co/dDwqG3N/two-businessman-discussing-their-chart-coffee-shop.jpg";
const About = () => {


    return (
        <div className="my-24">
            <Heading heading="About Us"></Heading>
            <section className="p-4 lg:p-8">
                <div className="container mx-auto space-y-12">
                    <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
                        <img src={img1} alt="" className="h-80 dark:bg-gray-500 aspect-video" />
                        <div className="flex flex-col justify-center flex-1 p-6 ">
                            <span className="text-xs uppercase dark:text-gray-600">Efficient Management</span>
                            <h3 className="text-3xl font-bold">Streamline Your Asset Management</h3>
                            <p className="my-6 dark:text-gray-600">XYZ's asset management system simplifies tracking and managing assets, ensuring HR managers can efficiently monitor both returnable and non-returnable items.</p>
                            <button type="button" className="self-start">Learn More</button>
                        </div>
                    </div>
                    <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse">
                        <img src={img2} alt="" className="h-80 dark:bg-gray-500 aspect-video" />
                        <div className="flex flex-col justify-center flex-1 p-6 ">
                            <span className="text-xs uppercase dark:text-gray-600">User-Friendly Interface</span>
                            <h3 className="text-3xl font-bold">Easy to Use for All Businesses</h3>
                            <p className="my-6 dark:text-gray-600">Our web application is designed for businesses of all sizes, offering a subscription-based model that provides flexibility and ease of use for asset management.</p>
                            <button type="button" className="self-start">Learn More</button>
                        </div>
                    </div>
                    <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
                        <img src={img3} alt="" className="h-80 dark:bg-gray-500 aspect-video" />
                        <div className="flex flex-col justify-center flex-1 p-6 ">
                            <span className="text-xs uppercase dark:text-gray-600">Advanced Tracking</span>
                            <h3 className="text-3xl font-bold">Monitor Employee Usage</h3>
                            <p className="my-6 dark:text-gray-600">XYZ's system provides detailed tracking of employee usage of company assets, helping HR managers maintain control over returnable and non-returnable items.</p>
                            <button type="button" className="self-start">Learn More</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
