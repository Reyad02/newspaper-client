import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";


export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000/'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);
    // const {logOut} = useAuth();
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        console.log("Stop by the interceptor", token);
        config.headers.authorization = `Bearer ${token}`;
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });


    axiosSecure.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const status = error.response.status;
        console.log('status in error', status);
        if (status === 401 || status === 403) {
            await logOut();
            navigate("/login")
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};


export default useAxiosSecure;