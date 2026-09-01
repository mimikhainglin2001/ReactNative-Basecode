import { injectable, inject } from "tsyringe";

import {
  IUserRepository,
  RegisterResult,
  ForgotPasswordResult,
  VerifyForgotPasswordResult,
} from "@/domain/repositories/user.repository";

import { UserEntity } from "@/domain/entities/user.entity";

import { AuthResponseEntity } from "@/domain/entities/auth-response.entity";

import { AuthApi } from "../api/auth.api";
import { Result } from "@/core/utils/result";
import { getApiError } from "@/core/network/api-error";

@injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @inject("AuthApi")
    private api: AuthApi,
  ) {}

  async login(email: string, password: string) {
    try {
      /*
       * Authenticate.
       */
      const res = await this.api.login(email, password);

      const data = res.data;

      /*
       * A new/untrusted device makes the backend
       * request login OTP verification. That
       * response carries no tokens, so returning
       * a "successful" session here would later
       * produce a "No refresh token available"
       * error when the client tries to refresh.
       */
      if (data.requiresVerification || !data.accessToken || !data.refreshToken) {
        return Result.fail<AuthResponseEntity>(
          data.message ??
            "New device detected. A verification code has been sent to your email.",
        );
      }

      const { accessToken, refreshToken } = data;

      /*
       * Immediately use the newly received
       * access token to retrieve the user.
       */
      const me = await this.api.getMe(accessToken);

      /*
       * Convert API response to domain entity.
       */
      const user = new UserEntity(me.data.id, me.data.name, me.data.email);

      /*
       * Create domain authentication response.
       */
      const auth = new AuthResponseEntity(user, accessToken, refreshToken);

      return Result.ok(auth);
    } catch (error) {
      return Result.fail<AuthResponseEntity>(getApiError(error));
    }
  }

  async register(name: string, email: string, password: string) {
    try {
      const res = await this.api.register(name, email, password);

      return Result.ok({
        verificationId: res.data.verificationId,
      } as RegisterResult);
    } catch (error) {
      return Result.fail<RegisterResult>(getApiError(error));
    }
  }

  async verifyEmail(
    verificationId: string,
    otp: string,
    email: string,
    password: string,
  ) {
    try {
      await this.api.verifyEmail(verificationId, otp);

      return this.login(email, password);
    } catch (error) {
      return Result.fail<AuthResponseEntity>(getApiError(error));
    }
  }

  async resendVerification(verificationId: string) {
    try {
      await this.api.resendVerification(verificationId);

      return Result.ok(true);
    } catch (error) {
      return Result.fail<boolean>(getApiError(error));
    }
  }

  async forgotPassword(email: string) {
    try {
      const res = await this.api.forgotPassword(email);

      return Result.ok({
        verificationId: res.data.verificationId,
      } as ForgotPasswordResult);
    } catch (error) {
      return Result.fail<ForgotPasswordResult>(getApiError(error));
    }
  }

  async resendForgotPassword(verificationId: string) {
    try {
      const res = await this.api.resendForgotPassword(verificationId);

      return Result.ok({
        verificationId: res.data.verificationId,
      } as ForgotPasswordResult);
    } catch (error) {
      return Result.fail<ForgotPasswordResult>(getApiError(error));
    }
  }

  async verifyForgotPassword(verificationId: string, otp: string) {
    try {
      const res = await this.api.verifyForgotPassword(verificationId, otp);

      return Result.ok({
        resetToken: res.data.resetToken,
        expiresAt: res.data.expiresAt,
      } as VerifyForgotPasswordResult);
    } catch (error) {
      return Result.fail<VerifyForgotPasswordResult>(getApiError(error));
    }
  }

  async resetPassword(
    resetToken: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    try {
      await this.api.resetPassword(resetToken, newPassword, confirmPassword);

      return Result.ok(undefined);
    } catch (error) {
      return Result.fail<void>(getApiError(error));
    }
  }

  async getCurrentUser(): Promise<Result<UserEntity>> {
    try {
      const response = await this.api.getMe();

      const user = new UserEntity(
        response.data.id,
        response.data.name,
        response.data.email,
      );

      return Result.ok(user);
    } catch (error) {
      return Result.fail<UserEntity>(getApiError(error));
    }
  }
}
