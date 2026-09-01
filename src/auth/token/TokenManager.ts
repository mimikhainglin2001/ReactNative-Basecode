import * as SecureStore from "expo-secure-store";

import type { UserEntity } from "@/domain/entities/user.entity";
import type { ITokenManager } from "./ITokenManager";

export class TokenManager implements ITokenManager {
  private ACCESS_TOKEN = "access_token";

  private REFRESH_TOKEN = "refresh_token";

  private USER = "user";

  async saveTokens(accessToken: string, refreshToken: string): Promise<void> {
    await SecureStore.setItemAsync(this.ACCESS_TOKEN, accessToken);

    await SecureStore.setItemAsync(this.REFRESH_TOKEN, refreshToken);
  }

  async saveUser(user: UserEntity): Promise<void> {
    await SecureStore.setItemAsync(this.USER, JSON.stringify(user));
  }

  async getAccessToken(): Promise<string | null> {
    return SecureStore.getItemAsync(this.ACCESS_TOKEN);
  }

  async getRefreshToken(): Promise<string | null> {
    return SecureStore.getItemAsync(this.REFRESH_TOKEN);
  }

  async getUser(): Promise<UserEntity | null> {
    const user = await SecureStore.getItemAsync(this.USER);

    if (!user) {
      return null;
    }

    return JSON.parse(user) as UserEntity;
  }

  async clear(): Promise<void> {
    await SecureStore.deleteItemAsync(this.ACCESS_TOKEN);

    await SecureStore.deleteItemAsync(this.REFRESH_TOKEN);

    await SecureStore.deleteItemAsync(this.USER);
  }
}
