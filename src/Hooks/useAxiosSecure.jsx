import axios from "axios";
import useAuth from "./useAuth";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:7000'
})
const useAxiosSecure = () => {
    // const navigate = useNavigate();
    const { logOut } = useAuth();


    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });


    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
 
        if (status === 401 || status === 403) {
            // await logOut();
            // navigate('/login');
            toast.error("use axios secure a problem vai",error)
        }
        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;