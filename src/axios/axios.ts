import axios from 'axios';

//tuka definirame od kade ke povlekuva frontendot podatoci odnosno od koe url (backend)
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Put's the  token into header if the user is authenticated
    }
    return config;
});
export default axiosInstance;