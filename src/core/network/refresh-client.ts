// Only refresh-token request

import axios from "axios";

import { ENV } from "../config/env";

export const refreshClient = axios.create({
  baseURL: ENV.API_URL,

  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
  },
});
