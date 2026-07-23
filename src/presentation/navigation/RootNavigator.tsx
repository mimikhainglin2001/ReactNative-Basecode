import React from "react";

import AuthNavigator from "./AuthNavigator";

import AppNavigator from "./AppNavigator";
import { useAuthStore } from "@/auth/store/auth.store";

export default function RootNavigator() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  if (!isLoggedIn) {
    return <AuthNavigator />;
  }

  return <AppNavigator />;
}
