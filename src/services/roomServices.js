import { API_ENDPOINTS } from "@/config/apiConfig";
import axiosInstance from "./axiosInterceptor";

export const getAllRooms = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.rooms);
    if (!response.data) {
      throw new Error("No data found");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching rooms", error);
    throw error;
  }
};

export const updateRoomById = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${API_ENDPOINTS.rooms}/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
};

export const deleteRoomById = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.rooms}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
};