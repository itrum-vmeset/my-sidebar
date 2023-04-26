import axios from "axios";

export const API_URL = `http://localhost:5000/api`;

const $authHost = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

const authInterceptor = (config: any): any => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $authHost };
