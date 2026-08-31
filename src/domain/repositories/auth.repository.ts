import type { RefreshTokenResponse } from "@/auth/types";

export interface AuthRepository {
  refreshToken(refreshToken: string): Promise<RefreshTokenResponse>;
}
