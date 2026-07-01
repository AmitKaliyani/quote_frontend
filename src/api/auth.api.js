import axiosInstance from "./axios";

export const signupUser = async (data) => {
  const response = await axiosInstance.post("/auth/register", data);

  return response.data;
};

export const loginUser = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);

  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("/auth/logout");

  return response.data;
};

export const getMyProfile = async () => {
  const response = await axiosInstance.get("/auth/my-profile");
  return response?.data;
};

export const uploadAvatar = async (file) => {
  const response = await axiosInstance.patch("/auth/avatar", file);

  return response.data;
};
export const deleteAvatar = async () => {
  const response = await axiosInstance.delete("/auth/avatar");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await axiosInstance.patch("/auth/update-profile", data);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await axiosInstance.post("/auth/forgot-password", data);

  return response.data;
};

export const resetPassword = async (token, data) => {
  const response = await axiosInstance.patch(
    `auth/reset-password/${token}`,
    data,
  );

  return response.data;
};
