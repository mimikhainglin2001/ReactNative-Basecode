import { inject, injectable } from "tsyringe";

import type { IUserRepository } from "@/domain/repositories/user.repository";
import type { UserEntity } from "@/domain/entities/user.entity";
import type { Result } from "@/core/utils/result";

@injectable()
export class GetCurrentUserUseCase {
  constructor(
    @inject("IUserRepository")
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<Result<UserEntity>> {
    return this.userRepository.getCurrentUser();
  }
}
