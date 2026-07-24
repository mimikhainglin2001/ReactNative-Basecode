import { Spacing, Colors, Typography } from "@/presentation/theme/theme";

import React from "react";

import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
} from "react-native";

interface AppInputProps extends TextInputProps {
  label?: string;

  error?: string;
}

export default function AppInput({
  label,
  error,
  style,
  ...props
}: AppInputProps) {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput {...props} style={[styles.input, style]} />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.sm,
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

    padding: Spacing.md,

    borderRadius: 8,

    backgroundColor: Colors.surface,

    color: Colors.text,

    fontSize: Typography.body.fontSize,
  },

  error: {
    color: Colors.error,

    marginTop: 4,

    fontSize: 12,
  },
});
