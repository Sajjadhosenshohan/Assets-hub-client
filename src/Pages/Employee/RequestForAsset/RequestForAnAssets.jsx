import { RiArrowDropDownLine } from "react-icons/ri";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useEmployeeData from "../../../Hooks/useEmployeeData";
import toast from "react-hot-toast";
import Spinner from "../../../Components/Spinner";
import useAuth from "../../../Hooks/useAuth";

const RequestForAnAssets = () => {
    const axiosPublic = useAxiosPublic();
    const { loading } = useAuth();
    const { userDataEmployee, isLoading } = useEmployeeData();

    // const [currentDate] = useState(new Date().toLocaleDateString);
    const [currentDate] = useState(new Date().toLocaleDateString());

    const [selectedAsset, setSelectedAsset] = useState(null);
    const [selectedAsset2, setSelectedAsset2] = useState(null);
    // console.log(userDataEmployee)
    const { data: assets = [], refetch } = useQuery({
        queryKey: ["assets"],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/assets`);
            return data;
        },
    });
    console.log(currentDate)

    if (isLoading && loading) return <Spinner />;

    const handleRequest = (id, asset_product_name,
        asset_product_quantity,
        asset_product_type,
        asset_date_added,
        asset_availability,
        asset_Item_Added_By,) => {

        const data2 = {
            product_name: asset_product_name,
            product_quantity: asset_product_quantity,
            product_type: asset_product_type,
            date_added: asset_date_added,
            availability: asset_availability,
            Item_Added_By: asset_Item_Added_By,
        }

        setSelectedAsset2(data2)

        setSelectedAsset(id);
        setTimeout(() => {
            document.getElementById('my_modal_5').showModal();
        }, 1000);
    };

    const handleForm = async (e,) => {
        e.preventDefault();
        const notes = e.target.notes.value;
        const requestData = {
            requestDate: currentDate,
            requesterEmail: userDataEmployee?.email,
            requesterName: userDataEmployee?.name,
            notes,
            status: "pending"
        };
        const requestData2 = {
            ...selectedAsset2,
            requestDate: currentDate,
            requesterEmail: userDataEmployee?.email,
            requesterName: userDataEmployee?.name,
            notes,
            status: "pending"
        };

        try {
            const matchingAsset = assets.find(asset => asset?.requesterEmail === userDataEmployee?.email);
            if (matchingAsset) {
                // Update existing asset
                await axiosPublic.put(`/assets/${matchingAsset._id}`, requestData);
                toast.success('Request submitted successfully');
                document.getElementById('my_modal_5').close();
            } else {
                // Create a new asset
                await axiosPublic.post(`/addAssets`, requestData2);
                toast.success('New asset created successfully');
                document.getElementById('my_modal_5').close();
            }
            refetch(); // To refresh the assets list
        } catch (error) {
            console.error('Error submitting request', error);
        }
    };

    // Todo add request status
    const handleSearch = () => {
        console.log("filter")
    }
    const handleFilter = () => {
        console.log("filter")
    }


    return (
        <div className="mt-12 mb-24">
            <h2 className="text-3xl mb-10 text-center text-primary">Request For An Asset</h2>

            {/* button  */}

            <div className="mt-8 mb-10 flex items-center gap-10 justify-center">


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
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Asset Name</th>
                            <th>Asset Type</th>
                            <th>Availability</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {/* <tr>
                            <th>1</th>
                            <th>brush</th>
                            <th>non-returnable</th>
                            <td>out-of-stock</td>

                            <td><button className="btn btn-error">Request</button></td>
                        </tr> */}


                        {
                            assets?.map((asset, index) => (
                                <tr key={asset._id}>
                                    <th>{index + 1}</th>
                                    <td>{asset?.product_name}</td>
                                    <td>{asset?.product_type}</td>
                                    {/* asset.availability === "out_of_stock" */}
                                    <td>{asset?.availability}</td>
                                    <td>
                                        <button
                                            onClick={() => handleRequest(
                                                asset._id,
                                                asset.product_name,
                                                asset.product_quantity,
                                                asset.product_type,
                                                asset.date_added,
                                                asset.availability,
                                                asset.Item_Added_By,
                                            )}
                                            className={`btn btn-error ${asset?.status === "pending" && "cursor-not-allowed"}`}
                                            disabled={asset?.Item_Added_By !== userDataEmployee?.Added_By || asset?.notes}


                                        >
                                            {/* Request */}
                                            {
                                                asset?.Item_Added_By !== userDataEmployee?.Added_By
                                                    ? "Team member only"
                                                    : "Request now"
                                            }
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        {/* 
                        ● Asset Name
                        ● Asset Type
                        ● Email of requester
                        ● Name of requester
                        ● Request Date
                        ● Additional note
                        ● Status */}

                        {/* Modal */}

                        <dialog id="my_modal_5" className="mt-12 rounded-lg bg-secondary modal modal-bottom sm:modal-middle border-2 border-red-500 w-[70%] mx-auto">
                            <h1 className="text-2xl dark:text-primary lg:text-3xl font-bold text-center  ">PDF Preview!</h1>
                            <div className="h-full w-full md:p-5">


                                <form onSubmit={handleForm} style={{ minHeight: '300px', width: '100%', border: "2px solid blue" }}>
                                    <div>

                                        <h2>{new Date()?.toLocaleDateString}</h2>
                                        <label className="font-bold" >Quick Notes:</label>
                                        <textarea name="notes" type="email" className="min-h-[200px] border-primary block w-full px-4 py-2 mt-2  bg-white border-2 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring " />
                                    </div>

                                    <button type="submit" className=" font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg hover:bg-blue-900 bg-primary text-center">Request</button>
                                </form>

                                <div className="modal-action flex justify-center">
                                    <form method="dialog" className="w-full flex justify-center">
                                        <button className=" font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg hover:bg-blue-900 bg-primary text-center">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestForAnAssets;