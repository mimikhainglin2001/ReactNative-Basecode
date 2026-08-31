export interface ITokenManager {
  saveTokens(accessToken: string, refreshToken: string): Promise<void>;

  getAccessToken(): Promise<string | null>;

  getRefreshToken(): Promise<string | null>;

  clear(): Promise<void>;
}
