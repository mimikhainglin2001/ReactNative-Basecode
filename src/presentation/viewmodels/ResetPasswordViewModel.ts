import { resetPasswordUseCase } from "@/core/di/container";

export class ResetPasswordViewModel {
  async resetPassword(
    resetToken: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    return resetPasswordUseCase.execute(
      resetToken,
      newPassword,
      confirmPassword,
    );
  }
}
