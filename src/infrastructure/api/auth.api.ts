import { injectable } from "tsyringe";
import { apiClient } from "@/core/network/api-client";

@injectable()
export class AuthApi {
  async login(email: string, password: string) {
    const response = await apiClient.post("/login", {
      email,
      password,
    });

    return response.data;
  }

  async register(name: string, email: string, password: string) {
    const response = await apiClient.post("/register", {
      name,
      email,
      password,
    });

    return response.data;
  }
}
