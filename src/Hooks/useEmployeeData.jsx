import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useEmployeeData = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()

    const { data: userDataEmployee = [], isLoading, refetch: refetchEmployee } = useQuery({
        queryKey: ["userDataEmployee"],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/usersCheckEmployee/${user?.email}`);
            return data;
        },

    });

    // console.log(userData)
    return { userDataEmployee, isLoading, refetchEmployee }
};

export default useEmployeeData;