import "reflect-metadata";

import React from "react";

import Toast from "react-native-toast-message";

import RootNavigator from "./presentation/navigation/RootNavigator";

import container from "./core/di/container";

import { initializeApiClient } from "./core/network/api-client";

import type { ITokenManager } from "./auth/token/ITokenManager";

import { TokenRefreshCoordinator } from "./auth/services/token-refresh-coordinator";

const tokenManager = container.resolve<ITokenManager>("ITokenManager");

const tokenRefreshCoordinator = container.resolve<TokenRefreshCoordinator>(
  "TokenRefreshCoordinator",
);

initializeApiClient(tokenManager, tokenRefreshCoordinator);

export default function App() {
  return (
    <>
      <RootNavigator />

      <Toast />
    </>
  );
}
