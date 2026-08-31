import { inject, injectable } from "tsyringe";

import { GetCurrentUserUseCase } from "@/domain/usecases/get-current-user.usecase";
import { UserEntity } from "@/domain/entities/user.entity";
import { Result } from "@/core/utils/result";

@injectable()
export class ProfileViewModel {
  constructor(
    @inject("GetCurrentUserUseCase")
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
  ) {}

  async getCurrentUser(): Promise<Result<UserEntity>> {
    const result = await this.getCurrentUserUseCase.execute();

    if (!result.success) {
      return Result.fail(result.error ?? "Failed to get current user.");
    }

    return Result.ok(result.data);
  }
}