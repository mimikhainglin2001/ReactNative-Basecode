import { injectable } from "tsyringe";
import { apiClient } from "@/core/network/api-client";

@injectable()
export class AuthApi {
  async login(email: string, password: string) {
    return apiClient.post("/auth/login", {
      email,
      password,
    });
  }

  async register(fullName: string, email: string, password: string) {
    return apiClient.post("/auth/register", {
      fullName,

      email,

      password,
    });
  }

  refreshToken(refreshToken: string) {
    return apiClient.post("/api/auth/refresh-token", {
      refreshToken,
    });
  }
}
