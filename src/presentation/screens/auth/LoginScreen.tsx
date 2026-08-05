import React, { useMemo, useState } from "react";

import { Text, View, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AppButton, AppInput, AppMessage } from "@/presentation/components";

import AuthLayout from "@/presentation/layout/AuthLayout";

import { LoginViewModel } from "@/presentation/viewmodels/LoginViewModel";

import { AuthStackParamList } from "@/presentation/navigation/types";
import AppHeader from "@/presentation/components/Header/AppHeader";
import { Colors, Spacing, Typography } from "@/presentation/theme/theme";
import { loginSchema, LoginForm } from "@/presentation/validation/login.schema";
import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();

  const vm = useMemo(() => new LoginViewModel(), []);
  const [message, setMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: LoginForm) => {
    setLoading(true);

    try {
      const result = await vm.login(data.email, data.password);

      if (result.success) {
        setMessage(`Welcome ${result.data?.name}`);
      } else {
        setMessage(result.error ?? "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AppHeader title="EnterpriseRN" subtitle="Sign in to your account" />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <AppInput
            label="Email"
            placeholder="Email"
            value={field.value}
            onChangeText={field.onChange}
            error={errors.email?.message}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <AppInput
            label="Password"
            secureTextEntry
            placeholder="Password"
            value={field.value}
            onChangeText={field.onChange}
            error={errors.password?.message}
          />
        )}
      />

      <View style={{ marginTop: Spacing.md }}>
        <AppButton
          title="Login"
          loading={loading}
          disabled={loading}
          onPress={handleSubmit(handleLogin)}
        />
      </View>

      {message && <AppMessage message={message} type={messageType} />}
      <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
        Create account
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
