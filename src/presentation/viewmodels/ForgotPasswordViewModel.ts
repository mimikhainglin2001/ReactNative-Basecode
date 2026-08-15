import { forgotPasswordUseCase } from "@/core/di/container";

export class ForgotPasswordViewModel {
  async forgotPassword(email: string) {
    return forgotPasswordUseCase.execute(email);
  }
}
