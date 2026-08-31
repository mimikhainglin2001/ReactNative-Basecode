import React, { useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AuthLayout from "@/presentation/layout/AuthLayout";

import {
  AppButton,
  AppHeader,
  AppInput,
  AppMessage,
} from "@/presentation/components";

import { AuthStackParamList } from "@/presentation/navigation/types";

import { useRegisterForm } from "@/presentation/hooks/useRegisterForm";

import { Colors, Spacing, Typography } from "@/presentation/theme/theme";
import { Controller } from "react-hook-form";

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Register">;

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();

  /*
   * Registration form hook.
   *
   * Handles:
   *
   * - React Hook Form
   * - Zod validation
   * - ViewModel
   * - API request
   * - loading
   * - server errors
   */
  const {
    control,
    handleSubmit,
    formState: { errors },

    loading,

    message,

    messageType,

    submit,
  } = useRegisterForm();

  /*
   * Registration succeeded.
   *
   * Navigation belongs to
   * the screen.
   */
  const handleSuccess = (
    verificationId: string,
    email: string,
    password: string,
  ) => {
    navigation.navigate("VerifyEmail", {
      verificationId,
      email,
      password,
    });
  };

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

            <AppHeader title="EnterpriseRN" subtitle="Create your account" />

            {/* FORM */}

            <View style={styles.form}>
              {/* NAME */}

              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <AppInput
                    label="Name"
                    placeholder="Enter your name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    autoCorrect={false}
                    editable={!loading}
                    error={errors.fullName?.message}
                  />
                )}
              />

              {/* EMAIL */}

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <AppInput
                    label="Email"
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    editable={!loading}
                    error={errors.email?.message}
                  />
                )}
              />

              {/* PASSWORD */}

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <AppInput
                    label="Password"
                    placeholder="Create a password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                    error={errors.password?.message}
                    showPasswordToggle
                  />
                )}
              />

              {/* CONFIRM PASSWORD */}

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <AppInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                    error={errors.confirmPassword?.message}
                    showPasswordToggle
                  />
                )}
              />

              {/* REGISTER BUTTON */}

              <View style={styles.buttonWrapper}>
                <AppButton
                  title="Create Account"
                  onPress={handleSubmit(() => submit(handleSuccess))}
                  loading={loading}
                  disabled={loading}
                />
              </View>

              {/* SERVER MESSAGE */}

              {message ? (
                <AppMessage message={message} type={messageType} />
              ) : null}
            </View>

            {/* LOGIN */}

            <Text style={styles.linkText}>
              Already have an account?{" "}
              <Text
                style={styles.link}
                onPress={() => {
                  if (!loading) {
                    navigation.navigate("Login");
                  }
                }}
              >
                Login
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
  },

  container: {
    flex: 1,

    justifyContent: "center",
  },

  form: {
    gap: Spacing.md,
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
