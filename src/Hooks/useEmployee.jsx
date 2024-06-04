import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useEmployee = () => {
    const { user, loading } = useAuth();
    const mail = user?.email;
    const axiosSecure = useAxiosSecure();

    const { data: isEmployee, isLoading: isEmployeeLoading } = useQuery({
        queryKey: [mail, "employee"],
        enabled: !loading && !!mail && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/employee/${mail}`);
            return data.employee;
        },
    });

    // console.log("useEmployee", isEmployee); // Ensure this prints the expected value

    return { isEmployee, isEmployeeLoading };
};

export default useEmployee;