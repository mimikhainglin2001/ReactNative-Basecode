import type { AxiosInstance } from "axios";

import type { ITokenManager } from "@/auth/token/ITokenManager";
import type { TokenRefreshCoordinator } from "@/auth/services/token-refresh-coordinator";

import { createApiClient } from "./api-client.factory";

let apiClient: AxiosInstance | null = null;

export function initializeApiClient(
  tokenManager: ITokenManager,
  tokenRefreshCoordinator: TokenRefreshCoordinator,
): AxiosInstance {
  apiClient = createApiClient(tokenManager, tokenRefreshCoordinator);

  return apiClient;
}

export function getApiClient(): AxiosInstance {
  if (!apiClient) {
    throw new Error("API client has not been initialized.");
  }

  return apiClient;
}
