import axiosInstance from "./axiosInterceptor";

export const getAllModules = async () => {
  try {
    const response = await axiosInstance.get("/module");
    if (!response.data) {
      throw new Error("No data found");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching modules", error);
    throw error;
  }
};
