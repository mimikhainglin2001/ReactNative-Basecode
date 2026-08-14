import React, { useMemo, useState } from "react";

import { Text, View, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AuthLayout from "@/presentation/layout/AuthLayout";

import AppHeader from "@/presentation/components/Header/AppHeader";

import { AppButton, AppInput, AppMessage } from "@/presentation/components";

import { RegisterViewModel } from "@/presentation/viewmodels/RegisterViewModel";

import { AuthStackParamList } from "@/presentation/navigation/types";

import { registerSchema } from "@/presentation/validation/register.schema";

import { Colors, Spacing, Typography } from "@/presentation/theme/theme";

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Register">;

type MessageType = "success" | "error" | "warning" | "info";

interface FieldErrors {
  fullName?: string;
  email?: string;
  password?: string;
}

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();

  const vm = useMemo(() => new RegisterViewModel(), []);

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  /*
   * Field-level validation errors
   */
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  /*
   * General/API message
   */
  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<MessageType>("info");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    /*
     * Prevent double submission
     */
    if (loading) {
      return;
    }

    /*
     * Clear previous errors
     */
    setFieldErrors({});

    setMessage("");

    /*
     * Form data
     */
    const formData = {
      fullName,
      email,
      password,
    };

    /*
     * ZOD VALIDATION
     */
    const validation = registerSchema.safeParse(formData);

    /*
     * Validation failed
     */
    if (!validation.success) {
      const errors: FieldErrors = {};

      /*
       * Convert Zod errors
       * into field errors
       */
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (field === "fullName" || field === "email" || field === "password") {
          /*
           * Only show the first
           * error for each field
           */
          if (!errors[field]) {
            errors[field] = issue.message;
          }
        }
      });

      setFieldErrors(errors);

      return;
    }

    /*
     * Zod has successfully validated
     * and cleaned the data.
     */
    const {
      fullName: validatedFullName,
      email: validatedEmail,
      password: validatedPassword,
    } = validation.data;

    /*
     * Start loading
     */
    setLoading(true);

    try {
      /*
       * Call ViewModel
       */
      const result = await vm.register(
        validatedFullName,
        validatedEmail,
        validatedPassword,
      );

      /*
       * Backend/API error
       */
      if (!result.success) {
        setMessage(result.error ?? "Registration failed.");

        setMessageType("error");

        return;
      }

      /*
       * Get verification ID
       */
      const verificationId = result.data?.verificationId;

      /*
       * Make sure verificationId exists
       */
      if (!verificationId) {
        console.error(
          "Registration succeeded but verificationId is missing:",
          result,
        );

        setMessage(
          "Account was created, but email verification could not be started.",
        );

        setMessageType("error");

        return;
      }

      /*
       * Registration succeeded
       */
      setMessage(
        "Account created. Check your email for the verification code.",
      );

      setMessageType("success");

      /*
       * Navigate to Verify Email
       */
      navigation.navigate("VerifyEmail", {
        verificationId,
        email: validatedEmail,

        /*
         * You should remove password
         * from navigation params later.
         *
         * See note below.
         */
        password: validatedPassword,
      });
    } catch (error: any) {
      console.error("Register error:", error);

      setMessage(error?.message ?? "Registration failed.");

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <View style={styles.container}>
        <Text style={styles.title}>EnterpriseRN</Text>
        <Text style={styles.subtitle}>Sign up to your account</Text>
        <View style={styles.form}>
          {/* NAME */}

          <AppInput
            label="Name"
            placeholder="Enter your name"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            autoCorrect={false}
            editable={!loading}
            error={fieldErrors.fullName}
          />

          {/* EMAIL */}

          <AppInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            editable={!loading}
            error={fieldErrors.email}
          />

          {/* PASSWORD */}

          <AppInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
            error={fieldErrors.password}
          />

          {/* REGISTER BUTTON */}

          <View style={styles.buttonWrapper}>
            <AppButton
              title="Register"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
            />
          </View>

          {/* API / SERVER MESSAGE */}

          {message ? <AppMessage message={message} type={messageType} /> : null}
        </View>

        {/* LOGIN LINK */}

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
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
