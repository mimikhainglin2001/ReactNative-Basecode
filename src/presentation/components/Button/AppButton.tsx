import { Colors, Spacing, Typography, Radius } from "@/presentation/theme/theme";
import React, { ReactNode } from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

interface Props {
  title?: string;
  children?: ReactNode;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "outline" | "ghost" | "destructive";
  fullWidth?: boolean;
  align?: "left" | "center" | "right";
  style?: any;
}

export default function AppButton({
  title,
  children,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  fullWidth = false,
  align = "center",
  style,
}: Props) {
  const isOutline = variant === "outline";
  const isGhost = variant === "ghost";
  const isDestructive = variant === "destructive";

  const backgroundColor = isGhost
    ? "transparent"
    : isOutline
    ? "transparent"
    : isDestructive
    ? Colors.error
    : Colors.primary;

  const borderColor = isOutline
    ? Colors.primary
    : isDestructive
    ? Colors.error
    : "transparent";

  const textColor = isGhost
    ? Colors.text
    : isOutline
    ? Colors.primary
    : isDestructive
    ? Colors.white
    : Colors.white;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        fullWidth && styles.fullWidth,
        align !== "center" && styles[align as keyof typeof styles],
        { backgroundColor, borderColor },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {children ? (
        <View style={styles.childrenContainer}>{children}</View>
      ) : (
        <Text
          style={[
            styles.text,
            { color: textColor },
            isGhost && styles.ghostText,
          ]}
        >
          {loading ? "Loading..." : title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    minHeight: 48,
  },
  fullWidth: {
    width: "100%",
  },
  left: {
    alignItems: "flex-start",
  },
  right: {
    alignItems: "flex-end",
  },
  disabled: {
    opacity: 0.5,
  },
  childrenContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: Typography.body.fontSize,
    fontWeight: "600",
  },
  ghostText: {
    fontWeight: "500",
  },
});