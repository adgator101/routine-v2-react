import { API_ENDPOINTS } from "@/config/apiConfig";
import axiosInstance from "./axiosInterceptor";

export const getAllGroups = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.groups);
    if (!response.data) {
      throw new Error("No data found");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
};

export const updateGroupById = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${API_ENDPOINTS.groups}/${id}`, data);
    if (!response.data) {
      throw new Error("No data found");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error updating group:", error);
    throw error;
  }
};

export const deleteGroupById = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.groups}/${id}`);
    if (!response.data) {
      throw new Error("No data found")
    }
    return response.data.data;
  } catch (error) {
    console.error("Error deleting group:", error);
    throw error;
  }
};
