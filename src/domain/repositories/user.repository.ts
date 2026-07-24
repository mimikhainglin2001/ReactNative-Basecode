import { AuthResponseEntity } from "../entities/auth-response.entity";

export interface IUserRepository {
  login(email: string, password: string): Promise<AuthResponseEntity>;

  register(
    fullName: string,
    email: string,
    password: string,
  ): Promise<AuthResponseEntity>;
}
