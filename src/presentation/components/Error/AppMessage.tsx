import { Colors } from "@/presentation/theme/colors";
import React from "react";
import { Text, StyleSheet } from "react-native";

interface AppMessageProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
}

export default function AppMessage({
  message,
  type = "error",
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

  return <Text style={[styles.message, { color: textColor }]}>{message}</Text>;
}

const styles = StyleSheet.create({
  message: {
    fontSize: 14,
    marginTop: 8,
  },
});
