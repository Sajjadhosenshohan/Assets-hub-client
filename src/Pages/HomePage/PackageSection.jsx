
const PackageSection = () => {
    return (
        <div className="my-24">
            <div className=" dark:bg-secondary text-black">
                <div className="container px-6 py-8 mx-auto">
                    <h1 className="text-2xl font-semibold text-center  capitalize lg:text-3xl ">Package plan</h1>

                    <p className="max-w-2xl mx-auto mt-4 text-center text-gray-800 xl:mt-6 ">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias quas magni libero consequuntur voluptatum velit amet id repudiandae ea, deleniti laborum in neque eveniet.
                    </p>

                    <div className="grid grid-cols-1 gap-8 mt-6 xl:mt-12 xl:gap-12 md:grid-cols-2 lg:grid-cols-3">
                        <div className="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg dark:border-gray-700">
                            <p className=" text-gray-600 uppercase font-bold text-xl">Maximum 5 employees</p>

                            <h2 className="text-4xl font-semibold text-black uppercase ">
                                $5
                            </h2>

                            <button className="w-full font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary transition-colors duration-300 transform hover:bg-green-600 ">
                                Buy now
                            </button>
                        </div>

                        <div className="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg dark:border-gray-700">
                            <p className=" text-gray-600 uppercase font-bold text-xl">Maximum 10 employees</p>

                            <h2 className="text-4xl font-semibold text-black uppercase ">
                                $8
                            </h2>

                            <button className="w-full font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary transition-colors duration-300 transform hover:bg-green-600 ">
                                Buy now
                            </button>
                        </div>

                        <div className="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg dark:border-gray-700 ">
                            <p className=" text-gray-600 uppercase font-bold text-xl">Maximum 20 employees</p>

                            <h2 className="text-4xl font-semibold text-black uppercase ">
                                $15
                            </h2>

                            <button className="w-full font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary transition-colors duration-300 transform hover:bg-green-600 ">
                                Buy now
                            </button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageSection;