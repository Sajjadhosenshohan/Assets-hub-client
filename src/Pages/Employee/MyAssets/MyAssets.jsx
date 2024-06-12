
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useEmployeeData from "../../../Hooks/useEmployeeData";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Spinner from "../../../Components/Spinner";
import { RiArrowDropDownLine } from "react-icons/ri";
import Heading from "../../../Components/Heading";
import Pagination from "../../../Components/Pagination";
import { useState } from "react";
import { TiDelete } from "react-icons/ti";

const MyAssets = ({ heading_pending }) => {
    const axiosSecure = useAxiosSecure();
    const { userDataEmployee, isLoading: EmployeeLoading } = useEmployeeData();
    const { loading: authLoading } = useAuth();

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


    const { data, refetch } = useQuery({
        queryKey: ["assetByEmail", userDataEmployee?.email, currentPage, itemsPerPage, search, availabilityCheck],
        enabled: !authLoading && !!userDataEmployee?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assetByEmail/${userDataEmployee?.email}`,
                {
                    params: {
                        page: currentPage,
                        size: itemsPerPage,
                        search: search,
                        availabilityCheck: availabilityCheck,
                    }
                }
            );
            return data;
        },
    });


    // pagination function
    // Update the numberOfPages whenever data changes
    const { assetByEmail = [], count = 0 } = data || {};
    const newNumberOfPages = Math.ceil(count / itemsPerPage);
    console.log(assetByEmail)
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
    const handleFilter = (filterType, value) => {
        if (filterType === "status") {
            setAvailability(value);
        }
        if (filterType === "type") {
            setAvailability(value);
        }

    };



    const handleCancel = async (assetId) => {

        const asset_update = await axiosSecure.patch(`/asset_rejected/${assetId}`);
        // console.log(data)
        if (asset_update.data.modifiedCount > 0) {

            // reset();
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Rejected successfully`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        refetch();
    };

    const handleReturn = async (asset) => {
        
        const asset_update = await axiosSecure.patch(`/asset_returned/${asset._id}`);
        if (asset_update.data.modifiedCount > 0) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Asset returned successfully`,
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };

    if (authLoading || EmployeeLoading) return <Spinner />;
    return (
        <div className="my-24">
            <Heading heading_pending={heading_pending} heading={"My Requested Assets"}></Heading>

            <div className={`mb-10 flex flex-col md:flex-row items-center gap-5 md:gap-8 justify-start ${heading_pending && "hidden"}`}>
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
                        <li onClick={() => handleFilter('status', 'pending')}><a>Pending</a></li>
                        <li onClick={() => handleFilter('status', 'approved')}><a>Approved</a></li>
                        <li onClick={() => handleFilter('type', 'Returnable')}><a>Returnable</a></li>
                        <li onClick={() => handleFilter('type', 'Non-returnable')}><a>Non-returnable</a></li>
                    </ul>

                </div>
            </div>
            {/* search filter */}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Asset Name</th>
                            <th>Asset Type</th>
                            <th>Request Date</th>
                            <th>Approval Date</th>
                            <th>Request Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assetByEmail?.map((asset, index) => (
                            <tr key={asset._id}>
                                <th>{index + 1}</th>
                                <td>{asset.product_name}</td>
                                {/* <td>{asset.product_type}</td> */}

                                <td>
                                    <span className={`text-white p-1  rounded-xl ${asset?.product_type === 'Non-returnable' && 'bg-cyan-400'}
                                        ${asset?.product_type === 'Returnable' && 'bg-pink-400'}`}>
                                        {asset?.product_type}
                                    </span>
                                </td>

                                <td>{new Date(asset.requestDate).toLocaleDateString()}</td>
                                <td>{asset?.approvedDate}</td>
                                {/* <td>{asset.status}</td> */}

                                <td>
                                    <span className={`text-white p-1  rounded-xl ${asset.status === 'approved' && 'bg-green-400'}
                                        ${asset.status === 'rejected' && 'bg-red-400'}
                                         ${asset.status === 'pending' && 'bg-red-400'} 
                                        `}>
                                        {asset.status}
                                    </span>
                                </td>
                                <td>
                                    {asset.status === "pending" && (
                                        // <button className="btn btn-error" onClick={() => handleCancel(asset._id)}>Cancel</button>

                                        <button onClick={() => handleCancel(asset._id)} className="btn btn-circle btn-outline border-2 border-[#ec4134]">
                                            {
                                                <TiDelete className="text-[#ec4134] text-2xl" />
                                            }

                                        </button>
                                    )}
                                    {asset.status === "approved" && (
                                        <div className="flex gap-2">

                                            <Link to={`/asset/${asset._id}`}>
                                                <button className="btn bg-primary btn-success">Print</button>
                                            </Link>

                                            {asset.product_type === "Returnable" && (
                                                <button onClick={() => handleReturn(asset)} className="btn btn-info">
                                                    Return
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* pagination */}
                <Pagination heading_pending={heading_pending} handlePrevious={handlePrevious} pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} handleItemPerPage={handleItemPerPage} itemsPerPage={itemsPerPage} handleNext={handleNext}></Pagination>
            </div>
        </div>
    );
};


export default MyAssets;
