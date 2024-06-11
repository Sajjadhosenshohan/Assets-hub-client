import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserData from "../../../Hooks/useHRData";
import Spinner from "../../../Components/Spinner";
import Heading from "../../../Components/Heading";
import Swal from "sweetalert2";
import { FcApproval } from "react-icons/fc";
import { TiDelete } from "react-icons/ti";

const Top_five_pending_request = () => {
    const axiosSecure = useAxiosSecure();
    const { loading: authLoading, } = useAuth();
    const { userData, isLoading: userDataLoading } = useUserData();

    const { data: requests = [], isLoading: requestsLoading, isError, error, refetch } = useQuery({

        queryKey: ["Top_five_pending_req", userData?.email],
        enabled: !authLoading && !!userData?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/pending_req/${userData?.email}`);
            return data;
        },
    });

    // console.log("top five", requests)
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
            <Heading heading="Top Pending Request"></Heading>

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
                            <th>Status</th>
                            <th>Approve Button</th>
                            <th>Reject Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests?.map((assetReq, index) => (
                            <tr key={assetReq._id}>
                                <th>{index + 1}</th>
                                <td>{assetReq.product_name}</td>
                                <td>{assetReq.product_type}</td>
                                <td>{assetReq.requesterEmail}</td>
                                <td>{assetReq.requesterName}</td>
                                <td>
                                    {new Date(assetReq.requestDate).toLocaleDateString()}

                                </td>
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
            </div>
        </div>
    );
};

export default Top_five_pending_request;