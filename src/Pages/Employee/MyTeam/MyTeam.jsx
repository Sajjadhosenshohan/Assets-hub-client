// import { useQuery } from "@tanstack/react-query";
// import useUserData from "../../../Hooks/useUserData";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import useAuth from "../../../Hooks/useAuth";
import { FaUser } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useEmployeeData from "../../../Hooks/useEmployeeData";
import Heading from "../../../Components/Heading";

const MyTeam = () => {
   
    const axiosSecure = useAxiosSecure()
    const {userDataEmployee,isLoading} = useEmployeeData()

    const { data: myTeam = [],} = useQuery({
        queryKey: ["myTeam"],
        enabled: !isLoading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/company/${userDataEmployee?.companyName}`);
            return data;
        },
    });

    // console.log("my employee", myTeam)

    return (
        <div className="my-24">
            {/* <h2 className="text-3xl mb-10 text-center text-primary">My Team</h2> */}
            <Heading heading={"My Team"}></Heading>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th> Member Image</th>
                            <th> Member Name</th>
                            <th> Member Type</th>

                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            myTeam?.map((team, index) => (
                                <tr key={team._id}>
                                    <th >{index + 1}</th>
                                    <td>
                                        <div className="flex items-center ">
                                            <div className="avatar">
                                                <div className="mask  w-20 h-20">
                                                    <img src={team?.profileImage || "https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>{team?.name}</td>
                                    <td className="font-bold text-2xl">
                                        {
                                            team?.role === "hr" ? <GrUserAdmin className="text-[#FF6347]" />  : <FaUser className="text-[#4682B4]" />
                                        }
                                        {/* {team?.role} */}
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTeam;