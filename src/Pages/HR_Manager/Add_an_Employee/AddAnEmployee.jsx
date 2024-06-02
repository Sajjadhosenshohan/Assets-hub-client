import { Link } from "react-router-dom";

const AddAnEmployee = () => {


    return (
        <div className="mt-12 mb-24">
            <h2 className="text-3xl mb-10 text-center text-primary">Add Employee </h2>

            <div className="mb-10 space-y-2">
                <h2 className="text-2xl  text-left font-bold">Your Employees are <span className="text-primary">3</span><br />
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
                        <tr>
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
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddAnEmployee;