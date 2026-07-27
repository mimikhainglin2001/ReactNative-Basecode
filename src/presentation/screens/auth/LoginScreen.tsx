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

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();

  const vm = useMemo(() => new LoginViewModel(), []);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setMessage("Please fill all fields");

      setMessageType("warning");

      return;
    }

    try {
      setLoading(true);

      const result = await vm.login(email, password);

      if (result.success) {
        setMessage(`Welcome ${result.data?.name}`);

        setMessageType("success");
      } else {
        setMessage(result.error!);

        setMessageType("error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AppHeader title="EnterpriseRN" subtitle="Sign in to your account" />

      <AppInput
        label="Email"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <AppInput
        label="Password"
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <View style={{ marginTop: Spacing.md }}>
        <AppButton
          title="Login"
          loading={loading}
          disabled={loading}
          onPress={handleLogin}
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
