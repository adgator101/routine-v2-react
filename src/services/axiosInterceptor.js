import { API_BASE_URL } from "@/config/apiConfig";
import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Attach credentials to every request
axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Session expired or not authenticated — redirect to login
      window.location.href = "/auth/login";
    } else if (status === 403) {
      toast.error("You don't have permission to perform this action.");
    } else if (!error.response) {
      // Network error / server unreachable
      toast.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;