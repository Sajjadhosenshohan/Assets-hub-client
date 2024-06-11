
import { BiSolidNavigation } from "react-icons/bi";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { FaChartPie, FaFilter } from "react-icons/fa";
import { IoHandLeftOutline } from "react-icons/io5";
import { MdGrading } from "react-icons/md";
import Heading from "../../Components/Heading";
const Feature = () => {
    return (
        <section className=" mt-24 ">
            <div className="container mx-auto">

                <Heading heading="hr manager feature"></Heading>

                <div className="grid gap-6 my-16 lg:grid-cols-3 ">

                    {/* 1 */}
                    <div className="flex items-center rounded overflow-hidden shadow-lg dark:bg-secondary dark:text-gray-800 hover:bg-primary hover:text-white transition-all hover:scale-105 justify-center">

                        <div className="text-center  p-8 space-y-3 rounded-md">
                            <div className="w-8 h-8 mx-auto text-xl font-bold rounded-full dark:bg-primary dark:text-gray-50 flex items-center justify-center"><BiSolidNavigation /></div>
                            <h3 className="text-2xl font-semibold">User-friendly Navigation</h3>
                            <p >
                                Easily explore assignments, create new ones, and manage your profile
                            </p>
                        </div>
                    </div>

                    {/* 2 */}
                    <div className="flex justify-center items-center rounded overflow-hidden shadow-lg dark:bg-secondary dark:text-gray-800 hover:bg-primary hover:text-white transition-all hover:scale-105">

                        <div className="text-center  p-8 space-y-3 rounded-md">
                            <div className="w-8 h-8 mx-auto text-xl font-bold rounded-full dark:bg-primary dark:text-gray-50 flex items-center justify-center"><MdAssignmentTurnedIn /></div>
                            <h3 className="text-2xl font-semibold">Employee Management</h3>
                            <p >
                                Seamlessly  update, and delete employee with intuitive forms.
                            </p>
                        </div>
                    </div>

                    {/* 3*/}
                    <div className="flex justify-center items-center rounded overflow-hidden shadow-lg dark:bg-secondary dark:text-gray-800 hover:bg-primary hover:text-white transition-all hover:scale-105">

                        <div className="text-center  p-8 space-y-3 rounded-md">
                            <div className="w-8 h-8 mx-auto text-xl font-bold rounded-full dark:bg-primary dark:text-gray-50 flex items-center justify-center"><FaFilter /></div>
                            <h3 className="text-2xl font-semibold">Filtered Assets Viewing</h3>
                            <p >
                                Quickly find Assets based on its order, name etc.
                            </p>
                        </div>
                    </div>
                    {/* 4 */}
                    <div className="flex justify-center items-center rounded overflow-hidden shadow-lg dark:bg-secondary dark:text-gray-800 hover:bg-primary hover:text-white transition-all hover:scale-105">

                        <div className="text-center  p-8 space-y-3 rounded-md">
                            <div className="w-8 h-8 mx-auto text-xl font-bold rounded-full dark:bg-primary dark:text-gray-50 flex items-center justify-center"><FaChartPie /></div>
                            <h3 className="text-2xl font-semibold">Pie chart</h3>
                            <p >
                                Total percentage of returnable items and
                                non-returnable items
                            </p>
                        </div>
                    </div>
                    {/* 5*/}
                    <div className="flex justify-center  items-center rounded overflow-hidden shadow-lg dark:bg-secondary dark:text-gray-800 hover:bg-primary hover:text-white transition-all hover:scale-105">

                        <div className="text-center  p-8 space-y-3 rounded-md">
                            <div className="w-8 h-8 mx-auto text-xl font-bold rounded-full dark:bg-primary dark:text-gray-50 flex items-center justify-center"><MdGrading /></div>
                            <h3 className="text-2xl font-semibold">Efficient Payment System</h3>
                            <p >
                                Hr manager can payment to buy package
                            </p>
                        </div>
                    </div>
                    {/* 6*/}
                    <div className="flex justify-center items-center rounded overflow-hidden shadow-lg dark:bg-secondary dark:text-gray-800 hover:bg-primary hover:text-white transition-all hover:scale-105">

                        <div className="text-center  p-8 space-y-3 rounded-md">
                            <div className="w-8 h-8 mx-auto text-xl font-bold rounded-full dark:bg-primary dark:text-gray-50 flex items-center justify-center"><IoHandLeftOutline />
                            </div>
                            <h3 className="text-2xl font-semibold">Handle Assets</h3>
                            <p >
                                Hr manager can create, delete, update assets
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Feature;