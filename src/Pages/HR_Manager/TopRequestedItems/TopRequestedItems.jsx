
import Spinner from '../../../Components/Spinner';
import { useQuery } from '@tanstack/react-query';
import useUserData from '../../../Hooks/useHRData';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Heading from '../../../Components/Heading';

const TopRequestedItems = () => {
    const axiosSecure = useAxiosSecure();
    const { loading: authLoading} = useAuth();
    const { userData, isLoading: userDataLoading } = useUserData();

    const { data: requests = [], isLoading: requestsLoading, isError, error,} = useQuery({

        queryKey: ["Top_requested_item", userData?.email],
        enabled: !authLoading && !!userData?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/top_requests/${userData?.email}`);
            return data;
        },
    });

    console.log(requests)


    if (authLoading || userDataLoading || requestsLoading) return <Spinner />;
    if (isError) return <div>Error: {error.message}</div>;

    // const handleSearch = () => {
    //     console.log("filter");
    // };
    return (
        <div className="mt-12 mb-24">
            <Heading heading="Top Most Requested Items"></Heading>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product name</th>
                            <th>Request count</th>
                            <th>Requester Email</th>
                            <th>Item_Added_By</th>
                            {/* <th>Status</th>
                            <th>Approve Button</th>
                            <th>Reject Button</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {requests?.map((assetReq, index) => (
                            <tr key={assetReq._id}>
                                <th>{index + 1}</th>
                                <td>{assetReq?.product_name}</td>
                                <td>{assetReq?.requestCount}</td>
                                <td>{assetReq?.requesterEmail}</td>
                                <td>{assetReq?.Item_Added_By}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopRequestedItems;