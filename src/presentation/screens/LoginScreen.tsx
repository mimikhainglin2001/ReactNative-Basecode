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

import { LoginViewModel } from "../viewmodels/LoginViewModel";

import AppButton from "../components/Button/AppButton";
import AppMessage from "../components/Error/AppMessage";
import AppInput from "../components/Input/AppInput";

import { Colors, Spacing, Typography } from "../theme/theme";

import { AuthStackParamList } from "../navigation/types";

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
      setMessage("Please fill in all fields.");

      setMessageType("warning");

      return;
    }

    setLoading(true);

    setMessage("");

    try {
      const result = await vm.login(email.trim(), password);

      if (result.success) {
        setMessage(`Welcome ${result.data?.name}!`);

        setMessageType("success");

        // later:
        // navigation.replace("Home")
      } else {
        setMessage(result.error ?? "Login failed.");

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
        <View style={styles.container}>
          <Text style={styles.title}>EnterpriseRN</Text>

          <Text style={styles.subtitle}>Sign in to your account</Text>

          <View style={styles.form}>
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
                title="Login"
                onPress={handleLogin}
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
    paddingHorizontal: Spacing.lg,
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
