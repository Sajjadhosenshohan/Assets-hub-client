import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserData from "../../../Hooks/useHRData";
import Swal from "sweetalert2";

const MyEmployeeList = () => {
    const axiosSecure = useAxiosSecure()
    const {userData,isLoading} = useUserData()

    const { data: myEmployee = [], refetch } = useQuery({
        queryKey: ["myEmployee"],
        enabled: !isLoading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/company/${userData?.companyName}`);
            return data;
        },
    });

    // console.log("my employee", myEmployee)

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
        <div className="mt-12 mb-24">
            <h2 className="text-3xl mb-10 text-center text-primary">My Employee List</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th> Member Image</th>
                            <th> Member Name</th>
                            <th> Company</th>
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
                            <td><button className="btn btn-error">Remove</button></td>
                        </tr> */}

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
                                    <td>{employee?.role}</td>
                                    <td><button onClick={() => handleRemove(employee._id)} className="btn btn-error">Remove</button></td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEmployeeList;