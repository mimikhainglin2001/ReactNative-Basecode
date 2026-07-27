import { loginUseCase } from "@/core/di/container";

import { useAuthStore } from "@/auth/store/auth.store";

import { TokenManager } from "@/auth/token/TokenManager";

const tokenManager = new TokenManager();

export class LoginViewModel {
  async login(email: string, password: string) {
    const result = await loginUseCase.execute(email, password);

    if (!result.success) {
      return result;
    }

    await tokenManager.saveTokens(
      result.data!.accessToken,

      result.data!.refreshToken,
    );

    await tokenManager.saveUser(result.data!.user);

    useAuthStore.getState().login(result.data!.user);

    return result.data!.user;
  }
}
