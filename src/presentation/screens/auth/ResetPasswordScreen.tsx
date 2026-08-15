import React, { useMemo, useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AppButton, AppInput, AppMessage } from "@/presentation/components";

import AppScreen from "@/presentation/common/AppScreen";
import AppText from "@/presentation/common/AppText";

import { Colors } from "@/presentation/theme/colors";
import { Spacing } from "@/presentation/theme/spacing";

import { AuthStackParamList } from "@/presentation/navigation/types";

import { ResetPasswordViewModel } from "@/presentation/viewmodels/ResetPasswordViewModel";

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ResetPassword"
>;

type RouteProps = RouteProp<AuthStackParamList, "ResetPassword">;

export default function ResetPasswordScreen() {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<RouteProps>();

  const { resetToken } = route.params;

  const vm = useMemo(() => new ResetPasswordViewModel(), []);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      setMessage("Please fill in all fields.");

      setMessageType("warning");

      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");

      setMessageType("warning");

      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result = await vm.resetPassword(
        resetToken,
        password,
        confirmPassword,
      );

      if (result.success) {
        setMessage("Password reset successfully.");

        setMessageType("success");

        setTimeout(() => {
          navigation.replace("Login");
        }, 1000);
      } else {
        setMessage(result.error ?? "Unable to reset password.");

        setMessageType("error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <AppScreen>
          <View style={styles.container}>
            <AppText type="title">Create New Password</AppText>

            <AppText style={styles.description}>
              Choose a strong password for your account.
            </AppText>

            <View style={styles.form}>
              <AppInput
                label="New Password"
                placeholder="Enter new password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <AppInput
                label="Confirm Password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              <AppButton
                title="Reset Password"
                onPress={handleReset}
                loading={loading}
                disabled={loading}
              />

              {message ? (
                <AppMessage message={message} type={messageType} />
              ) : null}
            </View>
          </View>
        </AppScreen>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scroll: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    gap: Spacing.lg,
  },

  description: {
    color: Colors.textSecondary,
  },

  form: {
    gap: Spacing.md,
  },
});
