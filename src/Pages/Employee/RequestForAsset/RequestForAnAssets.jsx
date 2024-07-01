import { RiArrowDropDownLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useEmployeeData from "../../../Hooks/useEmployeeData";
import toast from "react-hot-toast";
import Spinner from "../../../Components/Spinner";
import useAuth from "../../../Hooks/useAuth";
import Pagination from "../../../Components/Pagination";
import Heading from "../../../Components/Heading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const RequestForAnAssets = () => {
    const axiosSecure = useAxiosSecure();
    const { loading } = useAuth();
    const { userDataEmployee, isLoading } = useEmployeeData();
    console.log(userDataEmployee)
    // pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [numberOfPages, setNumberOfPages] = useState(0);

    // search
    const [search, setSearch] = useState('');
    // filter
    const [availabilityCheck, setAvailability] = useState('');
    // pagination pages array
    const pages = Array.from({ length: numberOfPages }, (_, i) => i);
    // current date
    const [currentDate] = useState(new Date());
    // selected asset state
    const [selectedAsset2, setSelectedAsset2] = useState(null);
    const [selectedAsset, setSelectedAsset] = useState(null);

    // fetch data with react-query
    const { data, refetch } = useQuery({
        queryKey: ["assets_get", userDataEmployee?.email, currentPage, itemsPerPage, search, availabilityCheck],
        enabled: !loading && !!userDataEmployee?.email && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assets_get`, {
                params: {
                    page: currentPage,
                    size: itemsPerPage,
                    search: search,
                    availabilityCheck: availabilityCheck,
                }
            });
            return data;
        },
    });


    const { allAssets = [], count = 0 } = data || {};
    const newNumberOfPages = Math.ceil(count / itemsPerPage);


    if (newNumberOfPages !== numberOfPages) {
        setNumberOfPages(newNumberOfPages);
    }
    console.log(allAssets)

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
    const handleFilter = (filterType, value) => {
        if (filterType === "availability") {
            setAvailability(value);
        }
        if (filterType === "type") {
            setAvailability(value);
        }

    };




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
        setSelectedAsset(id)
        setSelectedAsset2(data2)

        setTimeout(() => {
            document.getElementById('my_modal_5').showModal();
        }, 1000);
    };

    const handleForm = async (e) => {
        e.preventDefault();
        const notes = e.target.notes.value;
        const requestData = {
            requestDate: currentDate,
            requesterEmail: userDataEmployee?.email,
            requesterName: userDataEmployee?.name,
            notes,
            status: "pending",
            companyName: userDataEmployee?.companyName,
            companyLogo: userDataEmployee?.companyLogo,
        };
        const requestData2 = {
            ...selectedAsset2,
            requestDate: currentDate,
            requesterEmail: userDataEmployee?.email,
            requesterName: userDataEmployee?.name,
            notes,
            status: "pending",
            companyName: userDataEmployee?.companyName,
            companyLogo: userDataEmployee?.companyLogo,
        };

        // console.log("req1", requestData)

        try {
            const matchingAsset = allAssets.find(asset => asset?.requesterEmail === userDataEmployee?.email);

            console.log(matchingAsset)
            if (matchingAsset) {
                // Update existing asset
                await axiosSecure.put(`/assets/${selectedAsset}`, requestData);
                toast.success('Request submitted successfully');
                document.getElementById('my_modal_5').close();
            } else {
                // Create a new asset
                await axiosSecure.post(`/addAssetsByEmployee`, requestData2);
                toast.success('New asset created successfully');
                document.getElementById('my_modal_5').close();
            }
            refetch(); // To refresh the assets list
        } catch (error) {
            console.error('Error submitting request', error);
        }
    };

    if (isLoading && loading) return <Spinner />;
    return (
        <div className="my-24">
            <Helmet>
                <title>Request For An Asset</title>
            </Helmet>
            <Heading heading={'Request For An Asset'}></Heading>

            <div className="mb-10 flex  flex-col md:flex-row items-center gap-5 md:gap-8 justify-start">
                {/* search */}
                <form className="flex gap-2">
                    <input onChange={(e) => setSearch(e.target.value)} type="text" name="search" className="grow border-primary  border-2 input input-bordered input-success" placeholder="Search items by it’s names" />
                </form>

                {/* button */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn hover:bg-green-800 m-1 font-bold text-white  bg-[#23BE0A]">
                        <h2>Filter Assets:</h2>
                        <RiArrowDropDownLine />
                    </div>

                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li onClick={() => handleFilter('availability', 'available')}><a>Available</a></li>
                        <li onClick={() => handleFilter('availability', 'out_of_stock')}><a>Out-of-stock</a></li>
                        <li onClick={() => handleFilter('type', 'Returnable')}><a>Returnable</a></li>
                        <li onClick={() => handleFilter('type', 'Non-returnable')}><a>Non-returnable</a></li>
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
                            <th>requester email</th>
                            <th>Asset Type</th>
                            <th>Availability</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            allAssets?.map((asset, index) => (
                                <tr key={asset._id}>
                                    <th>{index + 1}</th>
                                    <td>{asset?.product_name}</td>
                                    <td>{asset?.requesterEmail}</td>
                                    <td>
                                        <span className={`text-white p-1  rounded-xl ${asset?.product_type === 'Non-returnable' && 'bg-cyan-400'}
                                        ${asset?.product_type === 'Returnable' && 'bg-pink-400'}`}>
                                            {asset?.product_type}
                                        </span>
                                    </td>

                                    {/* asset.availability === "out_of_stock" */}

                                    <td>
                                        <span className={`text-white p-1  rounded-xl ${asset.availability === 'available' && 'bg-green-400'}
                                        ${asset.availability === 'out_of_stock' && 'bg-red-400'}`}>
                                            {asset?.availability}
                                        </span>
                                    </td>
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
                                            className={`className="font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-orange-400 text-center " ${asset?.availability === "out_of_stock" && "cursor-not-allowed bg-slate-400"}`}
                                            disabled={asset?.availability === "out_of_stock"

                                            }

                                        // asset?.Item_Added_By !== userDataEmployee?.Added_By ||


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

                        {/* Modal */}

                        <dialog id="my_modal_5" className="mt-12 py-10 rounded-lg bg-secondary  w-[90%]  md:w-[70%] mx-auto">
                            <h1 className="text-2xl mb-5 dark:text-primary lg:text-3xl font-bold text-center  ">PDF Preview!</h1>
                            <div className="w-full md:p-5">


                                <form className="mt-0 lg:min-h-[300px]" onSubmit={handleForm} style={{ width: '100%', }}>
                                    <div>

                                        <h2>{new Date()?.toLocaleDateString}</h2>
                                        <p className="font-bold text-center text-gray-700" >Quick Notes:</p>
                                        <textarea name="notes" type="email" className="min-h-[200px] border-primary block w-full px-4 py-2 mt-2  bg-white border-2 rounded-md  focus:border-primary focus:ring-primary focus:ring-opacity-40  focus:outline-none focus:ring " />
                                    </div>

                                    <div className="flex justify-center mt-5">
                                        <button type="submit" className="text-2xl text-center w-1/4 p-2 rounded-lg  font-bold bg-primary hover:bg-green-800 text-white">Request</button>
                                    </div>
                                </form>

                                <div className="modal-action flex justify-center">
                                    <form method="dialog" className="w-full flex justify-center">
                                        <button className="text-2xl p-2 rounded-lg  font-bold bg-[#ec4134] hover:bg-red-800 text-white">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>

                    </tbody>
                </table>
                {/* pagination */}
                <Pagination handlePrevious={handlePrevious} pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} handleItemPerPage={handleItemPerPage} itemsPerPage={itemsPerPage} handleNext={handleNext}></Pagination>
            </div>
        </div>
    );
};

export default RequestForAnAssets;