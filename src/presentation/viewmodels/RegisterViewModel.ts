import { registerUseCase } from "@/core/di/container";

export class RegisterViewModel {
  async register(name: string, email: string, password: string) {
    return await registerUseCase.execute(name, email, password);
  }
}