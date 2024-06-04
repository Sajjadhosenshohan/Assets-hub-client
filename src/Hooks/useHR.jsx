import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";



const useHR = () => {
    const { user, loading } = useAuth();
    const mail = user?.email;
    const axiosSecure = useAxiosSecure();

    const { data: isHr, isLoading: isHRLoading } = useQuery({
        queryKey: [mail, "hr"],
        enabled: !loading && !!mail && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/hr/${mail}`);
            return data.hr;
        },
    });

    // console.log("useHR", isHr); // Ensure this prints the expected value

    return { isHr, isHRLoading };
};

export default useHR;