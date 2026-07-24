import { injectable, inject } from "tsyringe";

import { IUserRepository } from "../repositories/user.repository";

@injectable()
export class RegisterUseCase {
  constructor(
    @inject("IUserRepository")
    private repository: IUserRepository,
  ) {}

  execute(fullName: string, email: string, password: string) {
    return this.repository.register(fullName, email, password);
  }
}
