import { useQuery } from "@tanstack/react-query";
import useUserData from "../../../Hooks/useHRData";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AllRequests = () => {
    const axiosPublic = useAxiosPublic()
    // hr data
    const { userData, isLoading } = useUserData()

    const { data: allRequest = [], refetch } = useQuery({
        queryKey: ["allRequest"],
        enabled: !isLoading,
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/allRequest/${userData?.email}`);
            return data;
        },
    });


    // const requestData = {
    //     requestDate: currentDate,
    //     requesterEmail: userDataEmployee?.email,
    //     requesterName: userDataEmployee?.name,
    //     notes,
    //     status: "pending"
    // };

    // try {
    //     await axiosPublic.put(`/assets/${selectedAsset}`, requestData);
    //     toast.success('Request submitted successfully');
    //     document.getElementById('my_modal_5').close();
    //     refetch(); // To refresh the assets list
    // } catch (error) {
    //     console.error('Error submitting request', error);
    // }

    const handleSearch = () => {
        console.log("filter")
    }

    return (
        <div className="mt-12 mb-24">
            <h2 className="text-3xl mb-10 text-center text-primary">All Request</h2>

            {/* button  */}

            <div className="mt-8 mb-10 flex items-center gap-10 justify-center">


                <form onSubmit={handleSearch} className="flex">
                    <label className="input border-2 border-green-500 flex items-center gap-2">
                        <input type="text" name="search" className="grow" placeholder="Search items by it’s names" />

                    </label>
                    <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-green-500 rounded-md -ml-1 hover:bg-green-800 focus:outline-none focus:bg-green-800">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className=" w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </button>
                </form>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
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
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <th>brush</th>
                            <th>non-returnable</th>
                            <td>miamaruf@gmail.com</td>
                            <td>mia</td>
                            <td>2034-5-12</td>
                            <td>good</td>
                            <td>Pending</td>
                            <td><button className="btn btn-error">Approve</button></td>
                            <td><button className="btn bg-primary btn-success">Reject</button></td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllRequests;
