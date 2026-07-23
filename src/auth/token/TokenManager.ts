import * as SecureStore from "expo-secure-store";

export class TokenManager {
  private ACCESS_TOKEN = "access_token";

  private REFRESH_TOKEN = "refresh_token";

  async saveTokens(accessToken: string, refreshToken: string) {
    await SecureStore.setItemAsync(this.ACCESS_TOKEN, accessToken);

    await SecureStore.setItemAsync(this.REFRESH_TOKEN, refreshToken);
  }

  async getAccessToken() {
    return SecureStore.getItemAsync(this.ACCESS_TOKEN);
  }

  async getRefreshToken() {
    return SecureStore.getItemAsync(this.REFRESH_TOKEN);
  }

  async clear() {
    await SecureStore.deleteItemAsync(this.ACCESS_TOKEN);

    await SecureStore.deleteItemAsync(this.REFRESH_TOKEN);
  }
}
