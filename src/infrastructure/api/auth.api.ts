import { apiClient } from "@/core/network/api-client";

export class AuthApi {
  async login(email: string, password: string) {
    const response = await apiClient.post("/login", {
      email,
      password,
    });

    return response.data;
  }
}
