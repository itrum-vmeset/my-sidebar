import axios from "axios";

import { AuthResponse } from "../models/IResponse";

export const API_URL = `http://localhost:5000/api`;

const $authHost = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

const authInterceptor = (config: any): any => {
  config.headers.authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return $authHost.request(originalRequest);
      } catch (e) {
        console.log("НЕ АВТОРИЗОВАН");
      }
    }
    throw error;
  }
);

export { $authHost };
