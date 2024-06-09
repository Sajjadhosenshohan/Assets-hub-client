import { RiArrowDropDownLine } from "react-icons/ri";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import {  useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AssetList = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth();
    const mail = user?.email;

    const handleFilter = () => {
        console.log("filter")
    }

    const handleSearch = () => {
        console.log("filter")
    }

    const { data: assets = [] , refetch } = useQuery({
        queryKey: ["assets"],
        // enabled: !loading && !!mail && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/assets`);
            return data;
        },

    });



    // delete items
    const handleDelete = (id,name) => {
        // console.log(id)
        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res =  await axiosSecure.delete(`/asset/delete/${id}`)
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            }
        });
    }
    // console.log(assets)

    return (
        <div className="mt-12 mb-24">
            <h2 className="text-3xl mb-10 text-center text-primary">Asset List</h2>

            {/* button  */}

            <div className="mt-8 mb-10 flex items-center gap-10 justify-center">

                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1 font-bold text-white  bg-[#23BE0A]">
                        <h2>Filter Assets:</h2>
                        <RiArrowDropDownLine />
                    </div>


                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >

                        <li onClick={() => handleFilter('Available')}><a>Available</a></li>
                        <li onClick={() => handleFilter('Out-of-stock')}><a>Out-of-stock</a></li>
                        <li onClick={() => handleFilter('Returnable')}><a>Returnable</a></li>
                        <li onClick={() => handleFilter('Non-returnable')}><a>Non-returnable</a></li>
                    </ul>

                </div>

                <form onSubmit={handleSearch} className="flex">
                    <label className="input border-2 border-green-500 flex items-center gap-2">
                        <input type="text" name="search" className="grow" placeholder="Search items by it’s names" />

                    </label>
                    <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-green-500 rounded-md -ml-1 hover:bg-green-800 focus:outline-none focus:bg-green-800">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className=" w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </button>
                </form>


                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1 font-bold text-white  bg-[#23BE0A]">
                        <h2>Sort items by quantity:</h2>
                        <RiArrowDropDownLine />
                    </div>


                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >

                        <li onClick={() => handleFilter('Non-returnable')}><a>All</a></li>
                        <li onClick={() => handleFilter('Available')}><a>1 to 10</a></li>
                        <li onClick={() => handleFilter('Out-of-stock')}><a>11 to 20</a></li>
                        <li onClick={() => handleFilter('Returnable')}><a>21 to 30</a></li>
                    </ul>

                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Product Type</th>
                            <th>Product Quantity</th>
                            <th>Date Added</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            assets?.map((asset, index) => (
                                <tr key={asset._id}>
                                    <th>{index + 1}</th>
                                    <td>{asset.product_name}</td>
                                    <td>{asset.product_type}</td>
                                    <td>{asset.product_quantity}</td>
                                    <td>{new Date(asset.date_added).toLocaleDateString()}</td>
                                    <td><button className="btn btn-error" onClick={() => handleDelete(asset._id, asset.product_name)}>Delete</button></td>
                                    <td><Link to={`/update/${asset._id}`}>
                                    <button className="btn bg-primary btn-success" >Update</button>
                                    </Link></td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetList;