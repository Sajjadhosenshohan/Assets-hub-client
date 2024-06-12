import axios from "axios";
// https://my-assets-server.vercel.app
const axiosPublic = axios.create({
    baseURL: 'https://my-assets-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;