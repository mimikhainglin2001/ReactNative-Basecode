import axios from "axios";

import { ENV } from "../config/env";

import container from "../di/container";
import { TokenManager } from "@/auth/token/TokenManager";

export const apiClient = axios.create({
  baseURL: ENV.API_URL,

  timeout: 10000,
});

apiClient.interceptors.request.use(async (config) => {
  const tokenManager = container.resolve<TokenManager>("TokenManager");
  const token = await tokenManager.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
