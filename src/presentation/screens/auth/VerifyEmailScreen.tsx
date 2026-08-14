import React, { useMemo, useState } from "react";

import { Text, View, StyleSheet, TextInput } from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AuthLayout from "@/presentation/layout/AuthLayout";

import AppHeader from "@/presentation/components/Header/AppHeader";

import { AppButton, AppMessage } from "@/presentation/components";

import { VerifyEmailViewModel } from "@/presentation/viewmodels/VerifyEmailViewModel";

import { AuthStackParamList } from "@/presentation/navigation/types";

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
      const result = await vm.verify(
        verificationId,
        otp.trim(),
        email,
        password,
      );

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

  const handleOtpChange = (value: string, index: number) => {
    const digits = value.replace(/[^0-9]/g, "").slice(0, 6 - index).split("");

    const otpArray = otp.split("");

    if (digits.length === 0) {
      otpArray[index] = "";
    } else {
      digits.forEach((digit, i) => {
        otpArray[index + i] = digit;
      });
    }

    setOtp(otpArray.join(""));
  };

  return (
    <AuthLayout>
      <AppHeader
        title="Verify Email"
        subtitle={`We sent a 6-digit code to ${email}`}
      />

      <View style={styles.form}>
        <View style={styles.otpContainer}>
          {Array.from({ length: 6 }).map((_, index) => (
            <TextInput
              key={index}
              value={otp[index] ?? ""}
              onChangeText={(value) => handleOtpChange(value, index)}
              keyboardType="number-pad"
              textAlign="center"
              style={styles.otpInput}
            />
          ))}
        </View>

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

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },

  otpInput: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    backgroundColor: Colors.background,
    fontSize: 22,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
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
