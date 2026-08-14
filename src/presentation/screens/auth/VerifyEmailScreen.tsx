import React from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AuthLayout from "@/presentation/layout/AuthLayout";

import { AppButton, AppHeader, AppMessage } from "@/presentation/components";

import { AuthStackParamList } from "@/presentation/navigation/types";

import { useVerifyEmailForm } from "@/presentation/hooks/useVerifyEmailForm";

import { Colors, Spacing, Typography } from "@/presentation/theme/theme";

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "VerifyEmail"
>;

type VerifyEmailRoute = RouteProp<AuthStackParamList, "VerifyEmail">;

export default function VerifyEmailScreen() {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<VerifyEmailRoute>();

  const { verificationId, email, password } = route.params;

  const {
    control,

    errors,

    otp,

    inputRefs,

    message,

    messageType,

    loading,

    resending,

    handleSubmit,

    handleVerify,

    handleResend,

    handleOtpChange,

    handleOtpKeyPress,
  } = useVerifyEmailForm({
    verificationId,
    email,
    password,
  });

  const isDisabled = loading || resending;

  return (
    <AuthLayout>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* HEADER */}

            <AppHeader
              title="Verify Email"
              subtitle={`We sent a 6-digit code to ${email}`}
            />

            {/* FORM */}

            <View style={styles.form}>
              {/* OTP */}

              <View style={styles.otpContainer}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    value={otp[index] ?? ""}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={(event) =>
                      handleOtpKeyPress(event.nativeEvent.key, index)
                    }
                    keyboardType="number-pad"
                    maxLength={6}
                    textAlign="center"
                    editable={!isDisabled}
                    selectTextOnFocus
                    autoFocus={index === 0}
                    style={[
                      styles.otpInput,

                      errors.otp ? styles.otpInputError : undefined,
                    ]}
                  />
                ))}
              </View>

              {/* VALIDATION ERROR */}

              {errors.otp?.message ? (
                <Text style={styles.errorText}>{errors.otp.message}</Text>
              ) : null}

              {/* VERIFY BUTTON */}

              <View style={styles.buttonWrapper}>
                <AppButton
                  title="Verify Email"
                  onPress={handleSubmit(handleVerify)}
                  loading={loading}
                  disabled={isDisabled}
                />
              </View>

              {/* RESEND */}

              <AppButton
                title="Resend Code"
                onPress={handleResend}
                loading={resending}
                disabled={isDisabled}
              />

              {/* SERVER MESSAGE */}

              {message ? (
                <AppMessage message={message} type={messageType} />
              ) : null}
            </View>

            {/* BACK TO LOGIN */}

            <Text style={styles.linkText}>
              <Text
                style={styles.link}
                onPress={() => {
                  if (isDisabled) {
                    return;
                  }

                  navigation.replace("Login");
                }}
              >
                Back to login
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,

    justifyContent: "center",
  },

  container: {
    flex: 1,

    justifyContent: "center",
  },

  form: {
    gap: Spacing.sm,
  },

  otpContainer: {
    flexDirection: "row",

    justifyContent: "space-between",

    gap: Spacing.sm,

    marginTop: Spacing.xl,
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

  otpInputError: {
    borderColor: Colors.error,
  },

  errorText: {
    ...Typography.caption,

    color: Colors.error,

    marginTop: Spacing.xs,
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
