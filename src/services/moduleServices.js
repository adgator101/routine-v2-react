import { API_ENDPOINTS } from "@/config/apiConfig";
import axiosInstance from "./axiosInterceptor";

export const getAllModules = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.modules);
    if (!response.data) {
      throw new Error("No data found");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching modules", error);
    throw error;
  }
};

export const updateModuleById = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${API_ENDPOINTS.modules}/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating module:", error);
    throw error;
  }
};

export const deleteModuleById = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.modules}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting module:", error);
    throw error;
  }
};