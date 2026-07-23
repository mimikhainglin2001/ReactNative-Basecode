import { injectable, inject } from "tsyringe";

import { IUserRepository } from "@/domain/repositories/user.repository";
import { UserEntity } from "@/domain/entities/user.entity";

import { AuthApi } from "../api/auth.api";

@injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @inject("IAuthApi")
    private api: AuthApi,
  ) {}

  async login(email: string, password: string) {
    const data = await this.api.login(email, password);

    return new UserEntity(data.id, data.name, data.email);
  }

  async register(name: string, email: string, password: string) {
    const data = await this.api.register(name, email, password);

    return new UserEntity(data.id, data.name, data.email);
  }
}
