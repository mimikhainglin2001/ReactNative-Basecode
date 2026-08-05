import { injectable, inject } from "tsyringe";

import { IUserRepository } from "@/domain/repositories/user.repository";

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
      const res = await this.api.login(email, password);

      const data = res.data.data;

      const user = new UserEntity(
        data.user.id,
        data.user.fullName,
        data.user.email,
      );

      const auth = new AuthResponseEntity(
        user,
        data.accessToken,
        data.refreshToken,
      );

      return Result.ok(auth);
    } catch (error) {
      return Result.fail<AuthResponseEntity>(getApiError(error));
    }
  }

  async register(fullName: string, email: string, password: string) {
    try {
      const res = await this.api.register(fullName, email, password);

      const data = res.data.data;

      const user = new UserEntity(data.id, data.fullName, data.email);

      const auth = new AuthResponseEntity(
        user,
        data.accessToken,
        data.refreshToken,
      );

      return Result.ok(auth);
    } catch (error) {
      return Result.fail<AuthResponseEntity>(getApiError(error));
    }
  }
}
