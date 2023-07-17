import axios from "axios";
import { getCookie } from "./cookieHandling";
import { toast } from 'react-toastify';
const url = "https://hotel-management-dffr.onrender.com/api/";

const instance = axios.create({
    baseURL: url,
    timeout: 10000,
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status == 404) {
            toast.error("Not authorised")
        }
        else if (error.response?.status == 400 && error.response?.data?.message) {
            toast.error(error.response?.data?.message);
        }
        else {
            toast.error("something went wrong");
        }
        throw error;
    }
);

instance.interceptors.request.use((request) => {
    request.headers["Authorization"] = `Bearer ${getCookie("token")}`;
    return request;
});

export default instance;
