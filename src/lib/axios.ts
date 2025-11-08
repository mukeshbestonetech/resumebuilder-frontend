// src/lib/axios.ts
import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api", // Your backend API URL
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession() as any;
    if (session) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const session = await getSession() as any;
      if (session) {
        // Call your backend to refresh the token
        try {
          const { data } = await axios.post("http://localhost:3001/api/auth/refresh", {
            refreshToken: session.refreshToken,
          });
          // Update the session with the new access token
          // This part is tricky with NextAuth and might require a custom solution
          // to update the session on the client-side.
          // For now, we'll just retry the original request with the new token.
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Handle refresh token failure (e.g., redirect to login)
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
