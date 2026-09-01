import { inject, injectable } from "tsyringe";

import type { ITokenManager } from "../token/ITokenManager";
import { useAuthStore } from "../store/auth.store";

@injectable()
export class AuthService {
  constructor(
    @inject("ITokenManager")
    private readonly tokenManager: ITokenManager,
  ) {}

  async restoreSession(): Promise<void> {
    const token = await this.tokenManager.getAccessToken();

    if (!token) {
      return;
    }

    const user = await this.tokenManager.getUser();

    if (!user) {
      await this.tokenManager.clear();
      return;
    }

    useAuthStore.getState().login(user);
  }

  async logout(): Promise<void> {
    await this.tokenManager.clear();

    useAuthStore.getState().logout();
  }
}
