import { TokenManager } from "../token/TokenManager";

import { useAuthStore } from "../store/auth.store";

export class AuthService {
  private tokenManager = new TokenManager();

  async restoreSession() {
    const token = await this.tokenManager.getAccessToken();

    if (token) {
      const user = await this.tokenManager.getUser();

      useAuthStore.getState().login(user);
    }
  }

  async logout() {
    await this.tokenManager.clear();

    useAuthStore.getState().logout();
  }
}
