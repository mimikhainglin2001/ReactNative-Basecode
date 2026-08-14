import React from "react";

import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TextInputProps,
} from "react-native";

import { Colors, Spacing, Typography } from "@/presentation/theme/theme";

interface Props extends TextInputProps {
  label?: string;
  error?: string;
}

export default function AppInput({ label, error, style, ...props }: Props) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        {...props}
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={
          props.placeholderTextColor ?? Colors.textSecondary
        }
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  label: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: Spacing.md,
    fontSize: Typography.body.fontSize,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },

  inputError: {
    borderColor: Colors.error,
  },

  error: {
    ...Typography.caption,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
});
