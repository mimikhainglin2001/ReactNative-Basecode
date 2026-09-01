import { inject, injectable } from "tsyringe";

import type { Result } from "@/core/utils/result";

import { UserEntity } from "@/domain/entities/user.entity";
import { LoginUseCase } from "@/domain/usecases/login.usecase";

import type { ITokenManager } from "@/auth/token/ITokenManager";

import { useAuthStore } from "@/auth/store/auth.store";

@injectable()
export class LoginViewModel {
  constructor(
    @inject("LoginUseCase")
    private loginUseCase: LoginUseCase,

    @inject("ITokenManager")
    private tokenManager: ITokenManager,
  ) {}

  async login(email: string, password: string): Promise<Result<UserEntity>> {
    /*
     * 1. Ask the LoginUseCase to authenticate
     *    the user.
     */
    const result = await this.loginUseCase.execute(email, password);

    /*
     * 2. Stop if authentication failed.
     */
    if (!result.success) {
      return {
        success: false,
        error: result.error ?? "Unable to sign in.",
      };
    }

    /*
     * 3. Make sure authentication data exists.
     */
    const auth = result.data;

    if (!auth) {
      return {
        success: false,
        error: "Invalid authentication response.",
      };
    }

    /*
     * 4. Save access token and refresh token.
     */
    await this.tokenManager.saveTokens(auth.accessToken, auth.refreshToken);

    /*
     * 5. Save the authenticated user.
     */
    await this.tokenManager.saveUser(auth.user);

    /*
     * 6. Update global authentication state.
     */
    useAuthStore.getState().login(auth.user);

    /*
     * 7. Return the authenticated user
     *    to the LoginScreen.
     */
    return {
      success: true,
      data: auth.user,
    };
  }
}
