import { injectable, inject } from "tsyringe";

import { IUserRepository } from "../repositories/user.repository";

@injectable()
export class ResendVerificationUseCase {
  constructor(
    @inject("IUserRepository")
    private repository: IUserRepository,
  ) {}

  execute(verificationId: string) {
    return this.repository.resendVerification(verificationId);
  }
}
