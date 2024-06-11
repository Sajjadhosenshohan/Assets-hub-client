import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../Components/Spinner";
import useUserData from "../../../Hooks/useHRData";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Heading from "../../../Components/Heading";

const Limited_stock_items = () => {
    const axiosSecure = useAxiosSecure();
    const { loading: authLoading, } = useAuth();
    const { userData, isLoading: userDataLoading } = useUserData();

    const { data: requests = [], isLoading: requestsLoading, isError, error, } = useQuery({

        queryKey: ["Limited_stock_items", userData?.email],
        enabled: !authLoading && !!userData?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/Limited_stock_items/${userData?.email}`);
            return data;
        },
    });

    console.log("top five", requests)


    if (authLoading || userDataLoading || requestsLoading) return <Spinner />;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="my-24">
            <Heading heading="Limited Stock items"></Heading>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Asset Name</th>
                            <th>Asset Type</th>
                            <th>Asset Quantity</th>
                            <th>availability</th>
                            <th>Item_Added_By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests?.map((assetReq, index) => (
                            <tr key={assetReq._id}>
                                <th>{index + 1}</th>
                                <td>{assetReq.product_name}</td>
                                <td>

                                    <span className={`text-white p-1  rounded-xl ${assetReq?.product_type === 'Non-returnable' && 'bg-cyan-400'}
                                        ${assetReq?.product_type === 'Returnable' && 'bg-pink-400'}`}>
                                        {assetReq?.product_type}
                                    </span>
                                </td>
                                <td>{assetReq.product_quantity}</td>
                                <td>
                                        <span className={`text-white p-1  rounded-xl ${assetReq.availability === 'available' && 'bg-green-400'}
                                        ${assetReq?.availability === 'out_of_stock' || 'Out_of_stock' && 'bg-red-400'}`}>
                                            {assetReq?.availability}
                                        </span>
                                    </td>
                                <td>{assetReq.Item_Added_By}</td>

                                {/* <td><button onClick={() => handleStatus(assetReq._id, "approved")} className="btn btn-error" disabled={assetReq.status === "approved"}>Approve</button></td>

                                <td><button onClick={() => handleStatus(assetReq._id, "rejected")} disabled={assetReq.status === "rejected"} className="btn bg-primary btn-success">Reject</button></td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Limited_stock_items;