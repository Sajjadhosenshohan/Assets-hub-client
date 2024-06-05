import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserData = () => {
    const axiosSecure = useAxiosSecure()
    const {user,loading} = useAuth()

    const { data: userData = [],isLoading} = useQuery({
        queryKey: ["userData"],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/usersCheck/${user?.email}`);
            return data;
        },

    });

    // console.log(userData)
    return {userData,isLoading}
};

export default useUserData;