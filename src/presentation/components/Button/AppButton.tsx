import { Colors, Spacing, Typography } from "@/presentation/theme/theme";
import React from "react";

import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  title: string;

  onPress: () => void;

  loading?: boolean;

  disabled?: boolean;

  variant?: "primary" | "outline";
}

export default function AppButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
}: Props) {
  const isOutline = variant === "outline";

  return (
    <TouchableOpacity
      style={[
        styles.container,

        isOutline ? styles.outline : undefined,

        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,

          isOutline ? styles.outlineText : undefined,
        ]}
      >
        {loading ? "Loading..." : title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,

    padding: Spacing.md,

    borderRadius: 8,

    alignItems: "center",
  },

  outline: {
    backgroundColor: "transparent",

    borderWidth: 1,

    borderColor: Colors.primary,
  },

  disabled: {
    opacity: 0.5,
  },

  text: {
    color: Colors.white,

    fontSize: Typography.body.fontSize,

    fontWeight: "600",
  },

  outlineText: {
    color: Colors.primary,
  },
});
