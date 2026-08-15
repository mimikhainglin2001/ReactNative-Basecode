import { injectable, inject } from "tsyringe";

import { IUserRepository } from "../repositories/user.repository";

@injectable()
export class ForgotPasswordUseCase {
  constructor(
    @inject("IUserRepository")
    private repository: IUserRepository,
  ) {}

  execute(email: string) {
    return this.repository.forgotPassword(email);
  }
}
