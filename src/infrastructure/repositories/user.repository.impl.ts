import { IUserRepository } from "@/domain/repositories/user.repository";

import { UserEntity } from "@/domain/entities/user.entity";

import { AuthApi } from "../api/auth.api";

export class UserRepositoryImpl implements IUserRepository {
  constructor(private api: AuthApi) {}

  async login(email: string, password: string) {
    const data = await this.api.login(email, password);

    return new UserEntity(data.id, data.name, data.email);
  }
}
