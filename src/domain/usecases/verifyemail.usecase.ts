import { injectable, inject } from "tsyringe";

import { IUserRepository } from "../repositories/user.repository";

@injectable()
export class VerifyEmailUseCase {
  constructor(
    @inject("IUserRepository")
    private repository: IUserRepository,
  ) {}

  execute(
    verificationId: string,
    otp: string,
    email: string,
    password: string,
  ) {
    return this.repository.verifyEmail(verificationId, otp, email, password);
  }
}
