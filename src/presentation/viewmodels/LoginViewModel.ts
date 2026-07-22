import { loginUseCase } from "@/core/di/container";

export class LoginViewModel {
  async login(email: string, password: string) {
    return await loginUseCase.execute(email, password);
  }
}
