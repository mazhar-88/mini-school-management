import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("user");
            window.location.href = "/sign-in"; 
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
