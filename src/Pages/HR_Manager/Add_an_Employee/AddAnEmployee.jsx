import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useUserData from "../../../Hooks/useHRData";
import Spinner from "../../../Components/Spinner";
import Heading from "../../../Components/Heading";
import { FaHandPointRight } from "react-icons/fa";
import { MdPersonAddAlt1 } from "react-icons/md";
import Pagination from "../../../Components/Pagination";

// todo donot show hr in this page
const AddAnEmployee = () => {
    const axiosSecure = useAxiosSecure();
    const { loading } = useAuth();
    const { userData, isLoading } = useUserData();
    const [selectedEmployees, setSelectedEmployees] = useState([]);


    // pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [numberOfPages, setNumberOfPages] = useState(0);

    // pagination pages array
    const pages = Array.from({ length: numberOfPages }, (_, i) => i);


    const { data, refetch } = useQuery({
        queryKey: ["AddEmployee", currentPage, itemsPerPage],
        enabled: !loading && !!userData?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/get_all_employee`, 
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

    // console.log(AddEmployee)



    // pagination function
    // Update the numberOfPages whenever data changes
    const { AddEmployee = [], count = 0 } = data || {};
    const newNumberOfPages = Math.ceil(count / itemsPerPage);
    console.log(AddEmployee)
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



    const handleAdd = async (id, employeeRole, employeeCompanyName) => {

        if (employeeRole === "hr") {
            return alert("you can't add an Hr_manager")
        }
        if (employeeCompanyName) {
            return alert("Already join in another company")
        }
        const createData = {
            companyName: userData?.companyName,
            companyLogo: userData?.companyLogo,
            Added_By: userData?.email,
            affiliate: "yes"
        };

        try {
            const asset_update = await axiosSecure.patch(`/users/${id}`, createData);
            if (asset_update.data.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Employee added to the team.",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }
        } catch (err) {
            console.log(err);
        }
    };


    const handleSelectEmployee = (id) => {
        setSelectedEmployees((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((employeeId) => employeeId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const handleAddSelected = async () => {
        const createData = {
            companyName: userData?.companyName,
            companyLogo: userData?.companyLogo,
            Added_By: userData?.email,
            affiliate: "yes"
        };

        try {
            const requests = selectedEmployees.map(id => axiosSecure.patch(`/users/${id}`, createData));
            await Promise.all(requests);

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Selected employees added to the team.",
                showConfirmButton: false,
                timer: 1500
            });

            setSelectedEmployees([]);
            refetch();
        } catch (err) {
            console.log(err);
        }
    };

    const getPackage = () => {
        if (userData?.category === 5) {
            return (
                <span className="text-2xl  text-left font-bold  flex gap-2 items-center my-4">
                    <FaHandPointRight className="text-primary" /> 5 Members for <span className="text-primary">$5</span>
                </span>
            );
        }
        if (userData?.category === 8) {
            return (
                <span className=" my-4 text-2xl  text-left font-bold  flex gap-2 items-center">
                    <FaHandPointRight className="text-primary" /> 10 Members for <span className="text-primary">$8</span>
                </span>
            );
        }
        if (userData?.category === 15) {
            return (
                <span className=" flex items-center my-4 text-2xl  text-left font-bold   gap-2 ">
                    <FaHandPointRight className="text-primary" /> 20 Members for <span className="text-primary">$15</span>
                </span>
            );
        }
        return null;
    };

    if (isLoading && loading) return <Spinner />;

    return (
        <div className="my-24">
            {/* <h2 className="text-3xl mb-10 text-center text-primary">Add Employee</h2> */}
            <Heading heading={"Add an Employee"}></Heading>
            <div className="mb-10 space-y-2">
                <h2 className="text-2xl text-left font-bold  flex gap-2 items-center">
                    <span className="text-primary"><FaHandPointRight /></span> Your Company has <span className="text-primary">{AddEmployee.length}</span> Employee{AddEmployee.length !== 1 ? 's' : ''}
                </h2>

                <h2 className="text-2xl  text-left font-bold  flex gap-2 items-center">
                    {getPackage()}
                </h2>

                {AddEmployee.length ? (
                    <Link to="/payment">
                        <button className="text-2xl p-2 rounded-lg text-left font-bold bg-primary hover:bg-green-800 text-white">
                            Increase the Limit
                        </button>
                    </Link>
                ) : (
                    <button disabled className="text-2xl p-2 rounded-lg text-left font-bold bg-gray-400 text-white cursor-not-allowed">
                        Increase the Limit
                    </button>
                )}
            </div>


            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Select</th>
                            <th>Member Image</th>
                            <th>Member Name</th>
                            <th>Add Employee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {AddEmployee.map((employee, index) => (
                            <tr key={employee._id}>
                                <td>{index + 1}</td>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={selectedEmployees.includes(employee._id)}
                                            onChange={() => handleSelectEmployee(employee._id)}
                                        />
                                    </label>
                                </th>

                                <td>
                                    <div className="flex items-center">
                                        <div className="avatar">
                                            <div className="w-20 h-20">
                                                <img src={employee.profileImage} alt="Member" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{employee.name}</td>


                                <td className="font-bold text-2xl">

                                    <button onClick={() => handleAdd(employee._id, employee?.role, employee?.companyName)} className="btn btn-circle btn-outline border-2 border-primary">
                                        {employee?.role === "employee" && (
                                            <MdPersonAddAlt1 className="text-primary text-2xl" />
                                        )}

                                        
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedEmployees.length > 0 && (
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleAddSelected}
                        className="btn bg-primary btn-success"
                    >
                        Add Selected Members to the Team
                    </button>
                </div>
            )}

            {/* pagination */}
            <Pagination handlePrevious={handlePrevious} pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} handleItemPerPage={handleItemPerPage} itemsPerPage={itemsPerPage} handleNext={handleNext}></Pagination>
        </div>
    );
};

export default AddAnEmployee;
