
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useEmployeeData from "../../../Hooks/useEmployeeData";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyAssets = ({heading}) => {
    const axiosSecure = useAxiosSecure();
    const { userDataEmployee, isLoading } = useEmployeeData();
    const { loading } = useAuth();

    const { data: assetByEmail = [], refetch } = useQuery({
        queryKey: ["assetByEmail", userDataEmployee?.email],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assetByEmail/${userDataEmployee?.email}`);
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


    return (
        <div className="mt-12 mb-24">
            <h2 className="text-3xl mb-10 text-center text-primary">{heading? heading: "My Requested Assets"}</h2>

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
                                <td>{asset.product_type}</td>
                                <td>{asset.requestDate}</td>
                                <td>{asset.status === 'approved' ? asset?.approvedDate : ''}</td>
                                <td>{asset.status}</td>
                                <td>
                                    {asset.status === "pending" && (
                                        <button className="btn btn-error" onClick={() => handleCancel(asset._id)}>Cancel</button>
                                    )}
                                    {asset.status === "approved" && (
                                        <div className="flex gap-2">

                                            <Link to={`/asset/${asset._id}`}>
                                                <button className="btn bg-primary btn-success">Print</button>
                                            </Link>

                                            {asset.product_type === "Returnable" && (
                                                <button onClick={()=>handleReturn(asset)} className="btn btn-info">
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


export default MyAssets;
