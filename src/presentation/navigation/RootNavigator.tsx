import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { useAuthStore } from "@/auth/store/auth.store";

import { AuthService } from "@/auth/services/auth.service";

import SplashScreen from "../screens/SplashScreen";

import AppNavigator from "./AppNavigator";

import AuthNavigator from "./AuthNavigator";

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    const checkAuth = async () => {
      const service = new AuthService();

      await service.restoreSession();

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
