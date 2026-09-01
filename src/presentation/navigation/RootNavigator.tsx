import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { useAuthStore } from "@/auth/store/auth.store";
import { AuthService } from "@/auth/services/auth.service";

import SplashScreen from "../screens/SplashScreen";

import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { container } from "tsyringe";

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const service = container.resolve<AuthService>("AuthService");

        await service.restoreSession();
      } catch (error) {
        console.error("RootNavigator auth restore error:", error);
      } finally {
        setLoading(false);
      }
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
