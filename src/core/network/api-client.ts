import axios from "axios";
import { ENV } from "../config/env";

export const apiClient = axios.create({
  baseURL: ENV.API_URL,

  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  console.log("API Request", config.url);

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    console.log(error.response?.data);

    return Promise.reject(error);
  },
);
