import { loginUseCase } from "@/core/di/container";
import container from "@/core/di/container";

import { TokenManager } from "@/auth/token/TokenManager";
import { useAuthStore } from "@/auth/store/auth.store";

import { Result } from "@/core/utils/result";

export class LoginViewModel {
  async login(email: string, password: string) {
    const result = await loginUseCase.execute(email, password);

    if (!result.success) {
      return result;
    }

    const tokenManager = container.resolve<TokenManager>("TokenManager");

    await tokenManager.saveTokens(
      result.data!.accessToken,
      result.data!.refreshToken,
    );

    useAuthStore.getState().login(result.data!.user);

    return Result.ok(result.data!.user);
  }
}
