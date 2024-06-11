import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import Heading from "../../Components/Heading";
import Spinner from "../../Components/Spinner";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useEmployeeData from "../../Hooks/useEmployeeData";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyPendingRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { userDataEmployee, isLoading: EmployeeLoading } = useEmployeeData();
    const { loading: authLoading } = useAuth();

    // // pagination
    // const [currentPage, setCurrentPage] = useState(0);
    // const [itemsPerPage, setItemsPerPage] = useState(10);
    // const [numberOfPages, setNumberOfPages] = useState(0);

    // // search
    // const [search, setSearch] = useState('');
    // // filter
    // const [availabilityCheck, setAvailability] = useState('');
    // // pagination pages array
    // const pages = Array.from({ length: numberOfPages }, (_, i) => i);


    const { data: allPending = [], refetch } = useQuery({
        queryKey: ["my_pending_request", userDataEmployee?.email],
        enabled: !authLoading && !!userDataEmployee?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/myPendingRequest/${userDataEmployee?.email}`
            );
            return data;
        },
    });

    const handleCancel = async (assetId) => {

        const asset_update = await axiosSecure.patch(`/asset_rejected/${assetId}`);
        // console.log(data)
        if (asset_update.data.modifiedCount > 0) {

            // reset();
            Swal.fire({
                position: "center",
                icon: "success",
                title: `updated successfully`,
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
            <Heading  heading={"My Requested Assets"}></Heading>
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
                        {allPending?.map((asset, index) => (
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
                                <td>{asset.status === 'approved' ? asset?.approvedDate : ''}</td>
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
            </div>
        </div>
    );
};

export default MyPendingRequest;