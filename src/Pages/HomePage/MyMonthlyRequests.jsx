import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useEmployeeData from "../../Hooks/useEmployeeData";
import useAuth from "../../Hooks/useAuth";
import Spinner from "../../Components/Spinner";
import Heading from "../../Components/Heading";

const MyMonthlyRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { userDataEmployee, isLoading: userDataLoading } = useEmployeeData();
    const { loading: authLoading } = useAuth();

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    console.log(currentMonth, currentYear)
    const { data: monthlyRequests = [], isLoading } = useQuery({
        queryKey: ["requestsByEmail", userDataEmployee?.email, currentMonth, currentYear],
        enabled: !authLoading && !!userDataEmployee?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/requestsByEmail/${userDataEmployee?.email}?month=${currentMonth}&year=${currentYear}`);
            return data;
        },
    });

    if (authLoading || userDataLoading || isLoading) return <Spinner />;

    // console.log("my month", monthlyRequests);

    return (
        <div className="my-24">
            <Heading heading="My monthly requests"></Heading>
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

                                <td>
                                    <span className={`text-white p-1  rounded-xl ${request?.product_type === 'Non-returnable' && 'bg-cyan-400'}
                                        ${request?.product_type === 'Returnable' && 'bg-pink-400'}`}>
                                        {request?.product_type}
                                    </span>
                                </td>

                                <td>
                                    {new Date(request.requestDate).toLocaleDateString()}
                                </td>
                                <td>
                                    {request.status === 'approved' ? new Date(request.approvedDate).toLocaleDateString() : ''}
                                </td>
                                {/* <td>{request.status}</td> */}
                                <td>
                                    <span className={`text-white p-1  rounded-xl ${request.status === 'approved' && 'bg-green-400'}
                                        ${request.status === 'rejected' && 'bg-red-400'}
                                         ${request.status === 'pending' && 'bg-red-400'} 
                                        `}>
                                        {request.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyMonthlyRequests;
