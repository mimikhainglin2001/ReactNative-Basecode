import { inject, injectable } from "tsyringe";

import type { AuthRepository } from "@/domain/repositories/auth.repository";

import type { ITokenManager } from "@/auth/token/ITokenManager";

@injectable()
export class TokenRefreshService {
  constructor(
    @inject("ITokenManager")
    private readonly tokenManager: ITokenManager,

    @inject("IAuthRepository")
    private readonly authRepository: AuthRepository,
  ) {}

  async refresh(): Promise<string> {
    const refreshToken = await this.tokenManager.getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await this.authRepository.refreshToken(refreshToken);

    await this.tokenManager.saveTokens(
      response.accessToken,
      response.refreshToken,
    );

    return response.accessToken;
  }
}
