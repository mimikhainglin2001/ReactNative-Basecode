import React, { useMemo, useState } from "react";

import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoginViewModel } from "@/presentation/viewmodels/LoginViewModel";

import { AuthStackParamList } from "@/presentation/navigation/types";

import { AppButton, AppInput, AppMessage } from "@/presentation/components";

import {
  loginSchema,
  LoginFormData,
} from "@/presentation/validation/login.schema";

import { Colors } from "@/presentation/theme/colors";

import { Spacing } from "@/presentation/theme/spacing";

import { Typography } from "@/presentation/theme/typography";

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();

  const vm = useMemo(() => new LoginViewModel(), []);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },

    mode: "onSubmit",
  });

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    setMessage("");

    try {
      const result = await vm.login(data.email, data.password);

      if (result.success) {
        setMessage(`Welcome ${result.data?.name}!`);

        setMessageType("success");
      } else {
        setMessage(result.error ?? "Login failed.");

        setMessageType("error");
      }
    } catch (error) {
      console.error("Login error:", error);

      setMessage("Something went wrong. Please try again.");

      setMessageType("error");
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
        <View style={styles.container}>
          <Text style={styles.title}>EnterpriseRN</Text>

          <Text style={styles.subtitle}>Sign in to your account</Text>

          <View style={styles.form}>
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
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Password"
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  error={errors.password?.message}
                />
              )}
            />

            <View style={styles.buttonWrapper}>
              <AppButton
                title="Login"
                onPress={handleSubmit(handleLogin)}
                loading={loading}
                disabled={loading}
              />
            </View>

            {message ? (
              <AppMessage message={message} type={messageType} />
            ) : null}
          </View>

          <Text style={styles.linkText}>
            Don't have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Text>
          </Text>
        </View>
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
    justifyContent: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  title: {
    ...Typography.title,
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.xs,
  },

  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: Spacing.xl,
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
