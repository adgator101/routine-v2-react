import axiosInstance from "./axiosInterceptor";

export const getAllGroups = async () => {
  try {
    const response = await axiosInstance.get("/groups");
    if (!response.data) {
      throw new Error("No data found");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
};