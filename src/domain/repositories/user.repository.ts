import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
  login(email: string, password: string): Promise<UserEntity>;
  register(name: string, email: string, password: string): Promise<UserEntity>;
}
