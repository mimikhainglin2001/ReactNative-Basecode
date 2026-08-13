import { loginUseCase } from "@/core/di/container";

import { useAuthStore } from "@/auth/store/auth.store";

import { TokenManager } from "@/auth/token/TokenManager";

import { Result } from "@/core/utils/result";
import { UserEntity } from "@/domain/entities/user.entity";

const tokenManager = new TokenManager();

export class LoginViewModel {
  async login(email: string, password: string): Promise<Result<UserEntity>> {
    const result = await loginUseCase.execute(email, password);

    if (!result.success) {
      return Result.fail(result.error ?? "Login failed");
    }

    await tokenManager.saveTokens(
      result.data!.accessToken,

      result.data!.refreshToken,
    );

    await tokenManager.saveUser(result.data!.user);

    useAuthStore.getState().login(result.data!.user);

    return Result.ok(result.data!.user);
  }
}
