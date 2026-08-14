import { loginUseCase } from "@/core/di/container";

import { useAuthStore } from "@/auth/store/auth.store";

import { TokenManager } from "@/auth/token/TokenManager";

import { Result } from "@/core/utils/result";

const tokenManager = new TokenManager();

export class LoginViewModel {
  async login(email: string, password: string) {
    const result = await loginUseCase.execute(email, password);

    if (!result.success) {
      return result;
    }

    const auth = result.data;

    if (!auth) {
      return Result.fail("Invalid authentication response.");
    }

    await tokenManager.saveTokens(auth.accessToken, auth.refreshToken);

    await tokenManager.saveUser(auth.user);

    useAuthStore.getState().login(auth.user);

    return Result.ok(auth.user);
  }
}
