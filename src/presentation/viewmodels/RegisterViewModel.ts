import { injectable, inject } from "tsyringe";

import { RegisterUseCase } from "@/domain/usecases/register.usecase";

@injectable()
export class RegisterViewModel {
  constructor(
    @inject("RegisterUseCase")
    private registerUseCase: RegisterUseCase,
  ) {}

  async register(fullName: string, email: string, password: string) {
    return this.registerUseCase.execute(fullName, email, password);
  }
}
