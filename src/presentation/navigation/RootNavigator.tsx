import React from "react";

import AuthNavigator from "./AuthNavigator";

import AppNavigator from "./AppNavigator";

export default function RootNavigator() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <AuthNavigator />;
  }

  return <AppNavigator />;
}
