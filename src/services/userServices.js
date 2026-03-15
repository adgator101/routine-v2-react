import { API_ENDPOINTS } from "@/config/apiConfig";
import axiosInstance from "./axiosInterceptor";

// Get all users (paginated)
export const getAllUsers = async (page = 1, limit = 20) => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.users}?page=${page}&limit=${limit}`
    );
    if (!response.data) {
      throw new Error("No data found");
    }
    return {
      data: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`${API_ENDPOINTS.users}/${userId}`);
    if (!response.data) {
      throw new Error("No data found");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Update user
export const updateUser = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(`${API_ENDPOINTS.users}/${userId}`, userData);
    if (!response.data) {
      throw new Error("No data found");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.users}/${userId}`);
    if (!response.data) {
      throw new Error("No data found");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Search users by name or email
export const searchUsers = async (query) => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.usersSearch}?q=${encodeURIComponent(query)}`
    );
    if (!response.data) {
      throw new Error("No data found");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

// User role constants
export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};