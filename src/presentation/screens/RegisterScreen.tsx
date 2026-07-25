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

import { RegisterViewModel } from "../viewmodels/RegisterViewModel";

import AppButton from "../components/Button/AppButton";

import AppMessage from "../components/Error/AppMessage";

import AppInput from "../components/Input/AppInput";

import { Colors, Spacing, Typography } from "../theme/theme";

import { AuthStackParamList } from "../navigation/types";

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

        // later:
        // navigation.replace("Home")
      } else {
        setMessage(result.error ?? "Registration failed.");

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
          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.subtitle}>Sign up to get started</Text>

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

            {message ? (
              <AppMessage message={message} type={messageType} />
            ) : null}
          </View>

          <Text style={styles.linkText}>
            Already have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Login")}
            >
              Login
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
