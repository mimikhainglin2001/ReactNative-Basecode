import React, { useMemo, useState } from "react";

import { Text, View, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AuthLayout from "@/presentation/layout/AuthLayout";

import AppHeader from "@/presentation/components/Header/AppHeader";

import { AppButton, AppInput, AppMessage } from "@/presentation/components";

import { RegisterViewModel } from "@/presentation/viewmodels/RegisterViewModel";

import { AuthStackParamList } from "@/presentation/navigation/types";
import { Colors, Spacing, Typography } from "@/presentation/theme/theme";

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Register">;

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();

  const vm = useMemo(() => new RegisterViewModel(), []);

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setMessage("Please fill in all fields.");

      setMessageType("warning");

      return;
    }

    setLoading(true);

    setMessage("");

    try {
      const result = await vm.register(fullName.trim(), email.trim(), password);

      if (result.success) {
        setMessage(`Welcome ${result.data?.name}!`);

        setMessageType("success");

        /*
          Later:
          after auto login,
          navigate to Home

          navigation.replace("Home")
        */
      } else {
        setMessage(result.error ?? "Registration failed.");

        setMessageType("error");
      }
    } catch (error: any) {
      setMessage(error?.message ?? "Registration failed.");

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AppHeader title="Create Account" subtitle="Sign up to get started" />

      <View style={styles.form}>
        <AppInput
          label="Name"
          placeholder="Enter your name"
          value={fullName}
          onChangeText={setFullName}
        />

        <AppInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <AppInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.buttonWrapper}>
          <AppButton
            title="Register"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
          />
        </View>

        {message ? <AppMessage message={message} type={messageType} /> : null}
      </View>

      <Text style={styles.linkText}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Login
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
