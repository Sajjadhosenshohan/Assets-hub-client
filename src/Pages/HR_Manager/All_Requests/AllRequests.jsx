import { useQuery } from "@tanstack/react-query";
import useUserData from "../../../Hooks/useHRData";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Spinner from "../../../Components/Spinner";
import { useState } from "react";
import Swal from "sweetalert2";
import "../../../Components/pagination.css"
import Pagination from "../../../Components/Pagination";
import Heading from "../../../Components/Heading";
import { TiDelete } from "react-icons/ti";
import { FcApproval } from "react-icons/fc";
// import Pagination from "../../../Components/pagination";
const AllRequests = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [numberOfPages, setNumberOfPages] = useState(0);

    const pages = []
    for (let i = 0; i < numberOfPages; i++) {
        pages.push(i)
    }

    const { loading: authLoading } = useAuth();
    const { userData, isLoading: userDataLoading } = useUserData();

    const { data, isLoading: requestsLoading, isError, error, refetch } = useQuery({
        queryKey: ["allRequest", userData?.email, currentPage, itemsPerPage],
        enabled: !authLoading && !userDataLoading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/allRequestByEmail/${userData?.email}?page=${currentPage}&size=${itemsPerPage}`);
            return data;
        },
    });

    // Update the numberOfPages whenever data changes
    const { requests = [], count = 0 } = data || {};
    const newNumberOfPages = Math.ceil(count / itemsPerPage);

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

    const handleStatus = async (assetId, asset_status) => {
        const asset_data = {
            approvedDate: new Date().toLocaleDateString(),
            status: asset_status,
        };
        const asset_update = await axiosSecure.put(`/asset_status_change/${assetId}`, asset_data);

        if (asset_update.data.modifiedCount > 0) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Updated successfully`,
                showConfirmButton: false,
                timer: 1500,
            });
            refetch();
        }
    };
    if (authLoading || userDataLoading || requestsLoading) return <Spinner />;
    if (isError) return <div>Error: {error.message}</div>;
    return (
        <div className="my-24">
            {/* <h2 className="text-3xl mb-10 text-center text-primary">All Requests: {count}</h2> */}
            <Heading heading="All Requests" count={count}></Heading>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Asset Name</th>
                            <th>Asset Type</th>
                            <th>Email of requester</th>
                            <th>Name of requester</th>
                            <th>Request Date</th>
                            <th>Additional note</th>
                            <th>Status</th>
                            <th>Approve Button</th>
                            <th>Reject Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((assetReq, index) => (
                            <tr key={assetReq._id}>
                                <th>{index + 1}</th>
                                <td>{assetReq.product_name}</td>
                                <td>{assetReq.product_type}</td>
                                <td>{assetReq.requesterEmail}</td>
                                <td>{assetReq.requesterName}</td>
                                <td>{new Date(assetReq.requestDate).toLocaleDateString()|| "not found"}</td>
                                <td>{assetReq.notes}</td>

                                <td>
                                    <span className={`text-white p-1  rounded-xl ${assetReq.status === 'approved' && 'bg-green-400'}
                                        ${assetReq.status === 'pending' && 'bg-cyan-400'}
                                        ${assetReq.status === 'rejected' && 'bg-red-400'}
                                        `}>
                                        {assetReq.status}
                                    </span>
                                </td>
                                
                                <td>

                                    <button
                                        onClick={() => handleStatus(assetReq._id, "approved")}

                                        className="btn btn-circle btn-outline border-2 border-primary">
                                        {
                                            <FcApproval className="text-primary text-2xl" />
                                        }
                                    </button>
                                </td>

                                <td>
                                    <button onClick={() => handleStatus(assetReq._id, "rejected")} disabled={assetReq.status === "rejected"} className="btn btn-circle btn-outline border-2 border-[#ec4134]">
                                        {
                                            <TiDelete className="text-[#ec4134] text-2xl" />
                                        }

                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination handlePrevious={handlePrevious} pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} handleItemPerPage={handleItemPerPage} itemsPerPage={itemsPerPage} handleNext={handleNext}></Pagination>

                {/* <div className="flex w-full">
                    <div className="pagination justify-center items-center shadow-lg   w-full  inline-flex  rounded-md ">
                        <button type="button" onClick={handlePrevious} className="inline-flex items-center px-2 py-2 text-sm font-semibold  rounded-l-md ">
                            <span className="bg-primary px-2 py-2 rounded-md text-white">Previous</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </button>


                        {
                            pages.map((page, index) => <button
                                className={currentPage === page && 'selected inline-flex items-center px-4 py-2 text-sm font-semibold border'}
                                onClick={() => setCurrentPage(page)}
                                key={index}
                            >{page}</button>)
                        }

                        <select className="px-2 py-2  text-black capitalize border-primary border-2 rounded-md" onChange={handleItemPerPage} value={itemsPerPage}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>

                        <button type="button" onClick={handleNext} className="inline-flex items-center px-2 py-2 text-sm font-semibold rounded-r-md ">
                            <span className="bg-primary px-2 py-2 rounded-md text-white">Next</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default AllRequests;
