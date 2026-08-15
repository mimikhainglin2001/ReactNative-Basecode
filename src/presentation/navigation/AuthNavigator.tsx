import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthStackParamList } from "./types";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import VerifyEmailScreen from "../screens/auth/VerifyEmailScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";

import VerifyResetCodeScreen from "../screens/auth/VerifyResetCodeScreen";

import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="Register" component={RegisterScreen} />

      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

      <Stack.Screen name="VerifyResetCode" component={VerifyResetCodeScreen} />

      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
