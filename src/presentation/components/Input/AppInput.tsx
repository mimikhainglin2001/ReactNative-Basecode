import React from "react";

import { View, Text, TextInput, StyleSheet } from "react-native";

import { Colors, Spacing, Typography } from "@/presentation/theme/theme";

interface Props {
  label?: string;

  error?: string;

  value: string;

  onChangeText: (text: string) => void;

  placeholder: string;

  secureTextEntry?: boolean;

  keyboardType?: any;

  autoCapitalize?: any;
}

export default function AppInput({
  label,

  error,

  ...props
}: Props) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        {...props}
        style={[styles.input, error && styles.errorInput]}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },

  label: {
    ...Typography.caption,

    color: Colors.text,

    marginBottom: Spacing.xs,
  },

  input: {
    borderWidth: 1,

    borderColor: Colors.border,

    borderRadius: 8,

    padding: Spacing.md,

    backgroundColor: Colors.surface,

    color: Colors.text,
  },

  errorInput: {
    borderColor: "red",
  },

  error: {
    color: "red",

    marginTop: 4,

    fontSize: 12,
  },
});
