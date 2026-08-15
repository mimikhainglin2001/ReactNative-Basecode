import { injectable, inject } from "tsyringe";

import { IUserRepository } from "../repositories/user.repository";

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject("IUserRepository")
    private repository: IUserRepository,
  ) {}

  execute(
    resetToken: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    return this.repository.resetPassword(
      resetToken,
      newPassword,
      confirmPassword,
    );
  }
}
