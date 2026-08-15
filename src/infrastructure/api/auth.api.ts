import { injectable } from "tsyringe";
import { apiClient } from "@/core/network/api-client";

@injectable()
export class AuthApi {
  async login(email: string, password: string) {
    return apiClient.post("/v1/auth/login", {
      email,
      password,
    });
  }

  async register(name: string, email: string, password: string) {
    return apiClient.post("/v1/auth/register", {
      name,

      email,

      password,
    });
  }

  async verifyEmail(verificationId: string, otp: string) {
    return apiClient.post("/v1/auth/verify-email", {
      verificationId,

      otp,
    });
  }

  async resendVerification(verificationId: string) {
    return apiClient.post("/v1/auth/resend-verification", {
      verificationId,
    });
  }
  async forgotPassword(email: string) {
    return apiClient.post("/v1/auth/forgot-password", {
      email,
    });
  }

  async resendForgotPassword(verificationId: string) {
    return apiClient.post("/v1/auth/resend-forgot-password", {
      verificationId,
    });
  }

  async verifyForgotPassword(verificationId: string, otp: string) {
    return apiClient.post("/v1/auth/verify-forgot-password", {
      verificationId,
      otp,
    });
  }

  async resetPassword(
    resetToken: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    return apiClient.post("/v1/auth/reset-password", {
      resetToken,
      newPassword,
      confirmPassword,
    });
  }

  async getMe(accessToken: string) {
    return apiClient.get("/v1/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  refreshToken(refreshToken: string) {
    return apiClient.post("/v1/auth/refresh", {
      refreshToken,
    });
  }
}
