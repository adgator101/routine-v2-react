import { API_ENDPOINTS } from "@/config/apiConfig";
import axiosInstance from "./axiosInterceptor";

export const getAllTeachers = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.teachers);
    if (!response.data) {
      throw new Error("No data found");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching teachers", error);
    throw error;
  }
};

export const updateTeacherById = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${API_ENDPOINTS.teachers}/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating teacher:", error);
    throw error;
  }
};

export const deleteTeacherById = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.teachers}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting teacher:", error);
    throw error;
  }
};