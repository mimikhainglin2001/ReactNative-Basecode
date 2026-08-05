import axios from "axios";

import { ENV } from "../config/env";

import { TokenManager } from "@/auth/token/TokenManager";

const tokenManager = new TokenManager();

export const apiClient = axios.create({
  baseURL: ENV.API_URL,

  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await tokenManager.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
