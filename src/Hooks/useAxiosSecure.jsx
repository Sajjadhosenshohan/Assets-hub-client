import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:7000'
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();
    const [error, setError] = useState(null);

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;

        if (status === 401 || status === 403) {
            await logOut();
            setError(error);
            // toast.error("Unauthorized access detected. Redirecting to login.");
        }
        return Promise.reject(error);
    });

    useEffect(() => {
        if (error) {
            navigate('/login');
        }
    }, [error, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
