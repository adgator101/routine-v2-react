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
