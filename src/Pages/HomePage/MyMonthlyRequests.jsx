import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useEmployeeData from "../../Hooks/useEmployeeData";
import useAuth from "../../Hooks/useAuth";
import Spinner from "../../Components/Spinner";

const MyMonthlyRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { userDataEmployee, isLoading: userDataLoading } = useEmployeeData();
    const { loading: authLoading } = useAuth();

    const { data: monthlyRequests = [], isLoading,} = useQuery({

        queryKey: ["monthlyRequests", userDataEmployee?.email],
        enabled: !authLoading && !userDataLoading,

        queryFn: async () => {
            const currentMonth = new Date().getMonth() + 1;
            const currentYear = new Date().getFullYear();
            const { data } = await axiosSecure.get(`/requestsByEmail/${userDataEmployee?.email}?month=${currentMonth}&year=${currentYear}`);
            return data;
        },
    });

    if (authLoading || userDataLoading || isLoading) return <Spinner />;


    // const sortedRequests = monthlyRequests.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
    // console.log(monthlyRequests)

    return (
        <div className="mt-12 mb-24">
            <h2 className="text-3xl mb-10 text-center text-primary">My Monthly Requests</h2>

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
                        </tr>
                    </thead>
                    <tbody>
                        {monthlyRequests?.map((request, index) => (
                            <tr key={request._id}>
                                <th>{index + 1}</th>
                                <td>{request.product_name}</td>
                                <td>{request.product_type}</td>
                                <td>{request.requestDate}</td>
                                <td>{request.status === 'approved' ? request?.approvedDate : ''}</td>
                                <td>{request.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyMonthlyRequests;
