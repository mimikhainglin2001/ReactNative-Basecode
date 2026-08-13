import { registerUseCase } from "@/core/di/container";

export class RegisterViewModel {
  async register(fullName: string, email: string, password: string) {
    return registerUseCase.execute(fullName, email, password);
  }
}
