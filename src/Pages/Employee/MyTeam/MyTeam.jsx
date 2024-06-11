
import { FaUser } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useEmployeeData from "../../../Hooks/useEmployeeData";
import Heading from "../../../Components/Heading";
import useAuth from "../../../Hooks/useAuth";
import Spinner from "../../../Components/Spinner";
import { useState } from "react";
import Pagination from "../../../Components/Pagination";

const MyTeam = () => {

    const axiosSecure = useAxiosSecure()
    const { loading } = useAuth()
    const { userDataEmployee, isLoading } = useEmployeeData()

    console.log(userDataEmployee)
     // pagination
     const [currentPage, setCurrentPage] = useState(0);
     const [itemsPerPage, setItemsPerPage] = useState(10);
     const [numberOfPages, setNumberOfPages] = useState(0);
 
     // pagination pages array
     const pages = Array.from({ length: numberOfPages }, (_, i) => i);


    const { data} = useQuery({
        queryKey: ["myTeams", userDataEmployee?.companyName ,currentPage, itemsPerPage],
        enabled: !loading && !!userDataEmployee?.companyName,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users_company/${userDataEmployee?.companyName}`,
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

     // pagination function
    // Update the numberOfPages whenever data changes
    const { myTeam = [], count = 0 } = data || {};
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



    if (loading || isLoading ) return <Spinner />;
    console.log("my employee", myTeam)
    return (
        <div className="my-24">
            {/* <h2 className="text-3xl mb-10 text-center text-primary">My Team</h2> */}
            <Heading heading={"My Team"}></Heading>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th> Member Image</th>
                            <th> Member Name</th>
                            <th> Member Type</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            myTeam?.map((team, index) => (
                                <tr key={team._id}>
                                    <th >{index + 1}</th>
                                    <td>
                                        <div className="flex items-center ">
                                            <div className="avatar">
                                                <div className="mask  w-20 h-20">
                                                    <img src={team?.profileImage || "https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>{team?.name}</td>
                                    <td className="font-bold text-2xl">
                                        {
                                            team?.role === "hr" ? <GrUserAdmin className="text-[#FF6347]" /> : <FaUser className="text-[#4682B4]" />
                                        }
                                        {/* {team?.role} */}
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>

                {/* pagination */}
                <Pagination handlePrevious={handlePrevious} pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} handleItemPerPage={handleItemPerPage} itemsPerPage={itemsPerPage} handleNext={handleNext}></Pagination>
            </div>
        </div>
    );
};

export default MyTeam;