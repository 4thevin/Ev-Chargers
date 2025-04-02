import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "/api";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

export default axiosInstance;
