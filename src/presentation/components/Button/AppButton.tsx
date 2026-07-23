import { Colors, Spacing, Typography } from "@/presentation/theme/theme";
import React from "react";

import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  title: string;

  onPress: () => void;

  loading?: boolean;

  disabled?: boolean;
}

export default function AppButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{loading ? "Loading..." : title}</Text>
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

  disabled: {
    opacity: 0.5,
  },

  text: {
    color: Colors.white,

    fontSize: Typography.body.fontSize,

    fontWeight: "600",
  },
});
