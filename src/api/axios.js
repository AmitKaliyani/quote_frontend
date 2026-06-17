import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default axiosInstance;

let isRefreshing = false;
let failedQueue = [];

const proceessQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve();
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  //  success case
  (response) => response,

  // Error case
  async (error) => {
    console.log("Access Token Expired: ", error);

    const originalRequest = error.config;

    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.post("/auth/refresh");
        proceessQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        proceessQueue(refreshError);
        console.log("Refresh Token Expired : ", refreshError);
        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
