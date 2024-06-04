import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useUserData from "../../../Hooks/useUserData";

const AddAnEmployee = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth();

    const {userData} = useUserData()
    // console.log("employee vai", userData)


    const { data: AddEmployee = [], refetch } = useQuery({
        queryKey: ["AddEmployee"],
        // enabled: !loading && !!mail && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users`);
            return data;
        },

    });


    const handleAdd = async(id) => {
        console.log(id)

        const createData = {
            companyName: userData?.companyName,
            companyLogo: userData?.companyLogo,
        }

        console.log("43",createData)
        try {

            // 
            const asset_update = await axiosSecure.patch(`/users/${id}`, createData);
            console.log(asset_update.data)
            if (asset_update.data.modifiedCount > 0) {
                // show success popup
                // reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: ` is updated to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            // form.reset()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="mt-12 mb-24">
            <h2 className="text-3xl mb-10 text-center text-primary">Add Employee </h2>

            <div className="mb-10 space-y-2">
                <h2 className="text-2xl  text-left font-bold">Your Employees are <span className="text-primary">{AddEmployee.length}</span><br />
                    You are Using
                    <span className="text-primary"> 5 members for $5</span> Package!
                </h2>

                <button className="text-2xl p-2 rounded-lg text-left font-bold bg-orange-500">
                    <Link to="/payment">
                        increase the limit
                    </Link>
                </button>


            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th> Member Image</th>
                            <th> Member Name</th>
                            <th> Member Type</th>
                            <th> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {/* <tr>
                            <th>1</th>
                            <td>
                                <div className="flex items-center ">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>

                                </div>
                            </td>
                            <td>mia_maruf</td>
                            <td>admin</td>
                            <td><button className="btn bg-primary btn-success">Add to Team</button></td>
                        </tr> */}

                        {
                            AddEmployee?.map((employee, index) => (
                                <tr key={employee._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center ">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={employee.profileImage} />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>{employee.fullName}</td>
                                    <td>{employee.role}</td>
                                    <td><button onClick={() => handleAdd(employee._id)} className="btn bg-primary btn-success" disabled={employee?.role === "hr" || employee.companyName}>Add to Team</button></td>
                                </tr>

                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddAnEmployee;