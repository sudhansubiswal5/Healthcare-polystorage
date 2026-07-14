import axiosInstance from "./axiosInstance";

// 🔑 Login API
export const loginUser = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);

  // Save token to localStorage
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

// 📝 Register API
export const registerUser = async (data) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};