import { loginUseCase } from "@/core/di/container";

import { useAuthStore } from "@/auth/store/auth.store";

import container from "@/core/di/container";

import { TokenManager } from "@/auth/token/TokenManager";

export class LoginViewModel {
  async login(email: string, password: string) {
    const result = await loginUseCase.execute(email, password);

    const tokenManager = container.resolve<TokenManager>("TokenManager");

    await tokenManager.saveTokens(result.accessToken, result.refreshToken);

    useAuthStore.getState().login(result.user);

    return result.user;
  }
}
