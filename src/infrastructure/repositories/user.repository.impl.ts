import { injectable, inject } from "tsyringe";

import { IUserRepository } from "@/domain/repositories/user.repository";

import { UserEntity } from "@/domain/entities/user.entity";

import { AuthResponseEntity } from "@/domain/entities/auth-response.entity";

import { AuthApi } from "../api/auth.api";

@injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @inject("AuthApi")
    private api: AuthApi,
  ) {}

  async login(email: string, password: string) {
    const res = await this.api.login(email, password);
    const data = res.data;

    const user = new UserEntity(
      data.user.id,
      data.user.fullName,
      data.user.email,
    );

    return new AuthResponseEntity(
      user,
      data.access_token,
      data.refresh_token,
    );
  }

  async register(fullName: string, email: string, password: string) {
    const res = await this.api.register(fullName, email, password);
    const data = res.data;

    const user = new UserEntity(
      data.id ?? email,
      data.fullName,
      data.email,
    );

    return new AuthResponseEntity(
      user,
      data.accessToken,
      data.refreshToken,
    );
  }
}
