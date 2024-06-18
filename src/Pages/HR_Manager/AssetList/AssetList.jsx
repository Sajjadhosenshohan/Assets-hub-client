import { RiArrowDropDownLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link} from "react-router-dom";
import Heading from "../../../Components/Heading";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import {useState } from "react";
import useUserData from "../../../Hooks/useHRData";
import Pagination from "../../../Components/Pagination";
import Spinner from "../../../Components/Spinner";
import { Helmet } from "react-helmet-async";
const AssetList = () => {
    const axiosSecure = useAxiosSecure()
    const { loading } = useAuth();
    const { userData, isLoading } = useUserData();


    // pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [numberOfPages, setNumberOfPages] = useState(0);

    // search
    const [search, setSearch] = useState('');
    // filter
    const [availabilityCheck, setAvailability] = useState('');

    // sorting
    const [sortField, setSortField] = useState('product_quantity');
    const [sortOrder, setSortOrder] = useState(1);

    // pagination pages array
    const pages = Array.from({ length: numberOfPages }, (_, i) => i);

    const { data, refetch } = useQuery({
        queryKey: ["assets", userData?.email, currentPage, itemsPerPage, search, availabilityCheck],
        enabled: !loading && !!userData?.email && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all_assets/${userData?.email}`,
                {
                    params: {
                        page: currentPage,
                        size: itemsPerPage,
                        search: search,
                        availabilityCheck: availabilityCheck,
                        sortField: sortField,
                        sortOrder: sortOrder
                    }
                }
            );
            return data;
        },

    });

    // pagination function
    // Update the numberOfPages whenever data changes
    const { assets = [], count = 0 } = data || {};
    const newNumberOfPages = Math.ceil(count / itemsPerPage);
    console.log(assets)

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

    const handleSort = (field, order) => {
        setSortField(field)
        setSortOrder(order)
        refetch();
    }

    const handleDelete = (id, name) => {
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
                const res = await axiosSecure.delete(`/asset/delete/${id}`)
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
    if (loading || isLoading) return <Spinner></Spinner>

    
    return (
        <div className="my-24">
            <Helmet>
                <title>Asset List</title>
            </Helmet>
            <Heading heading="Asset List"></Heading>
            {/* button  */}

            <div className="mb-10 flex flex-col md:flex-row items-center gap-5 md:gap-8 justify-start">
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
                        <li onClick={() => handleFilter('status', 'available')}><a>Available</a></li>
                        <li onClick={() => handleFilter('status', 'out_of_stock')}><a>Out of stock</a></li>
                        <li onClick={() => handleFilter('type', 'Returnable')}><a>Returnable</a></li>
                        <li onClick={() => handleFilter('type', 'Non-returnable')}><a>Non-returnable</a></li>
                    </ul>

                </div>

                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1 font-bold text-white  bg-[#23BE0A]">
                        <h2>Sort items by quantity:</h2>
                        <RiArrowDropDownLine />
                    </div>


                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >

                        <li onClick={() => handleSort('product_quantity', 1)}><a>Low to High</a></li>
                        <li onClick={() => handleSort("product_quantity", -1)}><a>Hight to Low</a></li>

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
                            <th>Availability</th>
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
                                    <td>

                                        <span className={`text-white p-1  rounded-xl ${asset?.product_type === 'Non-returnable' && 'bg-cyan-400'}
                                        ${asset?.product_type === 'Returnable' && 'bg-pink-400'}`}>
                                            {asset?.product_type}
                                        </span>
                                    </td>
                                    <td>{asset.product_quantity}</td>
                                    <td>{new Date(asset.date_added).toLocaleDateString()}</td>

                                    <td>
                                        <span className={`text-white p-1  rounded-xl ${asset.availability === 'available' && 'bg-green-400'}
                                        ${asset?.availability === 'out_of_stock' && 'bg-red-400'}`}>
                                            {asset?.availability}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(asset._id, asset.product_name)} className="btn btn-circle btn-outline border-2 border-[#ec4134]">
                                            {
                                                <MdDelete className="text-[#ec4134] text-2xl" />
                                            }

                                        </button>
                                    </td>

                                    <td>
                                        <Link to={`/update/${asset._id}`}>
                                            <button
                                                className="btn btn-circle btn-outline border-2 border-primary">
                                                {
                                                    <FiEdit className="text-primary text-2xl" />
                                                }
                                            </button>
                                        </Link>

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

export default AssetList;