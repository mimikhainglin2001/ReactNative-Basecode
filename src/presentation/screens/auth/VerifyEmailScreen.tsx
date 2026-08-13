import React, { useMemo, useState } from "react";

import { Text, View, StyleSheet } from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AuthLayout from "@/presentation/layout/AuthLayout";

import AppHeader from "@/presentation/components/Header/AppHeader";

import { AppButton, AppInput, AppMessage } from "@/presentation/components";

import { VerifyEmailViewModel } from "@/presentation/viewmodels/VerifyEmailViewModel";

import {
  AuthStackParamList,
} from "@/presentation/navigation/types";
import { Colors, Spacing, Typography } from "@/presentation/theme/theme";

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "VerifyEmail"
>;

type RoutePropType = RouteProp<AuthStackParamList, "VerifyEmail">;

export default function VerifyEmailScreen() {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<RoutePropType>();

  const { verificationId, email, password } = route.params;

  const vm = useMemo(() => new VerifyEmailViewModel(), []);

  const [otp, setOtp] = useState("");

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const [loading, setLoading] = useState(false);

  const [resending, setResending] = useState(false);

  const handleVerify = async () => {
    if (!otp.trim()) {
      setMessage("Please enter the 6-digit code.");

      setMessageType("warning");

      return;
    }

    setLoading(true);

    setMessage("");

    try {
      const result = await vm.verify(verificationId, otp.trim(), email, password);

      if (result.success) {
        setMessage(`Welcome ${result.data?.user.name}!`);

        setMessageType("success");
      } else {
        setMessage(result.error ?? "Verification failed.");

        setMessageType("error");
      }
    } catch (error: any) {
      setMessage(error?.message ?? "Verification failed.");

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);

    setMessage("");

    try {
      const result = await vm.resend(verificationId);

      if (result.success) {
        setMessage("Verification code resent. Check your email.");

        setMessageType("info");
      } else {
        setMessage(result.error ?? "Failed to resend code.");

        setMessageType("error");
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout>
      <AppHeader
        title="Verify Email"
        subtitle={`We sent a 6-digit code to ${email}`}
      />

      <View style={styles.form}>
        <AppInput
          label="Verification code"
          placeholder="Enter 6-digit code"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
        />

        <View style={styles.buttonWrapper}>
          <AppButton
            title="Verify"
            onPress={handleVerify}
            loading={loading}
            disabled={loading}
          />
        </View>

        <AppButton
          title="Resend code"
          onPress={handleResend}
          loading={resending}
          disabled={resending || loading}
        />

        {message ? <AppMessage message={message} type={messageType} /> : null}
      </View>

      <Text style={styles.linkText}>
        <Text style={styles.link} onPress={() => navigation.replace("Login")}>
          Back to login
        </Text>
      </Text>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: Spacing.sm,
  },

  buttonWrapper: {
    marginTop: Spacing.md,
  },

  linkText: {
    ...Typography.caption,

    color: Colors.textSecondary,

    textAlign: "center",

    marginTop: Spacing.lg,
  },

  link: {
    color: Colors.primary,

    fontWeight: "600",
  },
});
