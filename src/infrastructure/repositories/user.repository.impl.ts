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
    const data = await this.api.login(email, password);

    const user = new UserEntity(data.user.id, data.user.name, data.user.email);

    return new AuthResponseEntity(
      user,

      data.accessToken,

      data.refreshToken,
    );
  }

  async register(name: string, email: string, password: string) {
    const data = await this.api.register(name, email, password);

    const user = new UserEntity(data.user.id, data.user.name, data.user.email);

    return new AuthResponseEntity(
      user,

      data.accessToken,

      data.refreshToken,
    );
  }
}
