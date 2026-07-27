import * as SecureStore from "expo-secure-store";

export class TokenManager {
  private ACCESS_TOKEN = "access_token";

  private REFRESH_TOKEN = "refresh_token";

  private USER = "user";

  async saveTokens(accessToken: string, refreshToken: string) {
    await SecureStore.setItemAsync(this.ACCESS_TOKEN, accessToken);

    await SecureStore.setItemAsync(this.REFRESH_TOKEN, refreshToken);
  }

  async saveUser(user: any) {
    await SecureStore.setItemAsync(this.USER, JSON.stringify(user));
  }

  async getAccessToken() {
    return await SecureStore.getItemAsync(this.ACCESS_TOKEN);
  }

  async getRefreshToken() {
    return await SecureStore.getItemAsync(this.REFRESH_TOKEN);
  }

  async getUser() {
    const user = await SecureStore.getItemAsync(this.USER);

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  }

  async clear() {
    await SecureStore.deleteItemAsync(this.ACCESS_TOKEN);

    await SecureStore.deleteItemAsync(this.REFRESH_TOKEN);

    await SecureStore.deleteItemAsync(this.USER);
  }
}
