import { IUserRepository } from "../repositories/user.repository";

export class LoginUseCase {
  constructor(private repository: IUserRepository) {}

  execute(email: string, password: string) {
    return this.repository.login(email, password);
  }
}
