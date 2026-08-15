import { injectable, inject } from "tsyringe";

import { IUserRepository } from "../repositories/user.repository";

@injectable()
export class VerifyForgotPasswordUseCase {
  constructor(
    @inject("IUserRepository")
    private repository: IUserRepository,
  ) {}

  execute(verificationId: string, otp: string) {
    return this.repository.verifyForgotPassword(verificationId, otp);
  }
}
