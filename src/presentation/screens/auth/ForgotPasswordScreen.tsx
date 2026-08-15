import React, { useMemo, useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AppButton, AppInput, AppMessage } from "@/presentation/components";

import AppScreen from "@/presentation/common/AppScreen";
import AppText from "@/presentation/common/AppText";

import { Colors } from "@/presentation/theme/colors";
import { Spacing } from "@/presentation/theme/spacing";

import { AuthStackParamList } from "@/presentation/navigation/types";

import { ForgotPasswordViewModel } from "@/presentation/viewmodels/ForgotPasswordViewModel";

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ForgotPassword"
>;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<NavigationProp>();

  const vm = useMemo(() => new ForgotPasswordViewModel(), []);

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setMessage("Please enter your email.");
      setMessageType("warning");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result = await vm.forgotPassword(email.trim());

      if (result.success) {
        navigation.navigate("VerifyResetCode", {
          verificationId: result.data!.verificationId,
          email: email.trim(),
        });
      } else {
        setMessage(result.error ?? "Unable to send reset code.");

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
        <AppScreen>
          <View style={styles.container}>
            <AppText type="title">Forgot Password</AppText>

            <AppText style={styles.description}>
              Enter your email address and we'll send you a verification code.
            </AppText>

            <View style={styles.form}>
              <AppInput
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <AppButton
                title="Send Code"
                onPress={handleSubmit}
                loading={loading}
                disabled={loading}
              />

              {message ? (
                <AppMessage message={message} type={messageType} />
              ) : null}
            </View>

            <AppButton
              title="Back to Login"
              onPress={() => navigation.navigate("Login")}
              variant="outline"
            />
          </View>
        </AppScreen>
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
  },

  container: {
    flex: 1,
    justifyContent: "center",
    gap: Spacing.lg,
  },

  description: {
    color: Colors.textSecondary,
  },

  form: {
    gap: Spacing.md,
  },
});
