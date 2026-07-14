import axiosInstance from "./axiosInstance";

export const getBeds = async () => {
  try {
    const response = await axiosInstance.get("/hospital/beds");
    // If response.data is null/undefined, return []
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Fetch Error:", error);
    return []; 
  }
};