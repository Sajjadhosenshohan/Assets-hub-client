import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserData from "../../../Hooks/useHRData";
import Swal from "sweetalert2";
import { GrUserAdmin } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { MdGroupRemove } from "react-icons/md";
import { useState } from "react";
import Pagination from "../../../Components/Pagination";
import useAuth from "../../../Hooks/useAuth";
import Heading from "../../../Components/Heading";

const MyEmployeeList = () => {
    const axiosSecure = useAxiosSecure()
    const { userData } = useUserData()
    const { loading } = useAuth()
    // pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [numberOfPages, setNumberOfPages] = useState(0);

    // pagination pages array
    const pages = Array.from({ length: numberOfPages }, (_, i) => i);

    const { data, refetch } = useQuery({
        queryKey: ["myEmployee", userData?.companyName, currentPage, itemsPerPage],
        enabled: !loading && !!userData?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/company/${userData?.companyName}`,
                {
                    params: {
                        page: currentPage,
                        size: itemsPerPage,
                    }
                }
            );
            return data;
        },
    });
    // console.log(userData)


    // pagination function
    // Update the numberOfPages whenever data changes
    const { myEmployee = [], count = 0 } = data || {};
    const newNumberOfPages = Math.ceil(count / itemsPerPage);
    // console.log(myEmployee)

    // Update the numberOfPages state when data is fetched
    if (newNumberOfPages !== numberOfPages) {
        setNumberOfPages(newNumberOfPages);
    }


    const handleItemPerPage = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(0);
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }




    const handleRemove = async (id) => {
        // console.log(id)

        try {

            // 
            const asset_update = await axiosSecure.patch(`/usersRemove/${id}`);
            console.log(asset_update.data)
            if (asset_update.data.modifiedCount > 0) {
                // show success popup
                // reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Employee removed from company.`,
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch()
            }
            // form.reset()
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div className="my-24">
            {/* <h2 className="text-3xl mb-10 text-center text-primary">My Employee List</h2> */}
            <Heading heading="My Employee List"></Heading>
            <div className="overflow-x-auto ">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th> Member Image</th>
                            <th> Member Name</th>
                            <th> Company</th>
                            <th> Member Type</th>
                            <th> Remove Employee</th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            myEmployee?.map((employee, index) => (
                                <tr key={employee._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center ">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={employee?.profileImage || "https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>{employee?.name}</td>
                                    <td>{employee?.companyName}</td>
                                    {/* <td>{employee?.role}</td> */}
                                    <td className="font-bold text-2xl">
                                        {
                                            employee?.role === "hr" ? <GrUserAdmin className="text-[#FF6347]" /> : <FaUser className="text-[#4682B4]" />
                                        }
                                        {/* {team?.role} */}
                                    </td>
                                    {/* <td><button onClick={() => handleRemove(employee._id)} className="btn btn-error" disabled={employee?.role === 'hr'}>Remove</button></td> */}

                                    <td className="font-bold text-2xl">
                                        {
                                            employee?.role === "employee" ? <button onClick={() => handleRemove(employee._id, employee?.role, employee?.companyName)} className="btn btn-circle btn-outline border-2 border-[#ec4134]">
                                                {
                                                    <MdGroupRemove className="text-[#ec4134] text-2xl" />
                                                }

                                            </button> : <button disabled className="btn btn-circle btn-outline border-2 border-[#ec4134] cursor-not-allowed">
                                                {
                                                    <MdGroupRemove className="text-[#ec4134] text-2xl" />
                                                }
                                            </button>
                                        }
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>

                {/* pagination */}
                <div>
                    <Pagination handlePrevious={handlePrevious} pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} handleItemPerPage={handleItemPerPage} itemsPerPage={itemsPerPage} handleNext={handleNext}></Pagination>
                </div>
            </div>
        </div>
    );
};

export default MyEmployeeList;