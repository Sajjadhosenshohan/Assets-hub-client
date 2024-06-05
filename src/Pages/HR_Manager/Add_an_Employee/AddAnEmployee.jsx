import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useUserData from "../../../Hooks/useHRData";

const AddAnEmployee = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { userData } = useUserData();
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    const { data: AddEmployee = [], refetch } = useQuery({
        queryKey: ["AddEmployee"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users`);
            return data;
        },
    });

    const handleAdd = async (id) => {
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

    return (
        <div className="mt-12 mb-24">
            <h2 className="text-3xl mb-10 text-center text-primary">Add Employee</h2>

            <div className="mb-10 space-y-2">
                <h2 className="text-2xl text-left font-bold">
                    Your Employees are <span className="text-primary">{AddEmployee.length}</span>
                    <br />
                    You are Using <span className="text-primary">5 members for $5</span> Package!
                </h2>

                <button className="text-2xl p-2 rounded-lg text-left font-bold bg-orange-500">
                    <Link to="/payment">
                        increase the limit
                    </Link>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Member Image</th>
                            <th>Member Name</th>
                            <th>Member Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {AddEmployee.map((employee, index) => (
                            <tr key={employee._id}>
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
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-20 h-20">
                                                <img src={employee.profileImage} alt="Member" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{employee.name}</td>
                                <td>{employee.role}</td>
                                <td>
                                    <button
                                        onClick={() => handleAdd(employee._id)}
                                        className="btn bg-primary btn-success"
                                        disabled={employee?.role === "hr" || employee?.companyName}
                                    >
                                        Add to Team
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
        </div>
    );
};

export default AddAnEmployee;
