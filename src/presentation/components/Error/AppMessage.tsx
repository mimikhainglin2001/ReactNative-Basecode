import { Colors, Spacing, Typography, Radius } from "@/presentation/theme/theme";
import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface AppMessageProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onRetry?: () => void;
  style?: any;
}

export default function AppMessage({
  message,
  type = "error",
  onRetry,
  style,
}: AppMessageProps) {
  if (!message) {
    return null;
  }

  const textColor = (() => {
    switch (type) {
      case "success":
        return Colors.success;
      case "warning":
        return Colors.warning;
      case "info":
        return Colors.secondary;
      case "error":
      default:
        return Colors.error;
    }
  })();

  const bgColor = (() => {
    switch (type) {
      case "success":
        return "#DCFCE7";
      case "warning":
        return "#FEF3C7";
      case "info":
        return "#E0F2FE";
      case "error":
      default:
        return "#FEF2F2";
    }
  })();

  const borderColor = (() => {
    switch (type) {
      case "success":
        return Colors.success;
      case "warning":
        return Colors.warning;
      case "info":
        return Colors.secondary;
      case "error":
      default:
        return Colors.error;
    }
  })();

  return (
    <View style={[styles.container, { backgroundColor: bgColor, borderColor }, style]}>
      <Text style={[styles.message, { color: textColor }]}>{message}</Text>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
          <Text style={[styles.retryText, { color: borderColor }]}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.md,
  },
  message: {
    flex: 1,
    fontSize: Typography.body.fontSize,
  },
  retryButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
  },
  retryText: {
    fontSize: Typography.caption.fontSize,
    fontWeight: "600",
  },
});