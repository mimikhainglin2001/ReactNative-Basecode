import { injectable } from "tsyringe";
import { apiClient } from "@/core/network/api-client";

@injectable()
export class AuthApi {
  async login(email: string, password: string) {
    const response = await apiClient.post("/api/auth/login", {
      email,
      password,
    });

    return response.data;
  }

  async register(fullName: string, email: string, password: string) {
    const response = await apiClient.post("/api/auth/register", {
      fullName,
      email,
      password,
    });

    return response.data;
  }

  refreshToken(refreshToken: string) {
    return apiClient.post("/api/auth/refresh-token", {
      refreshToken,
    });
  }
}
