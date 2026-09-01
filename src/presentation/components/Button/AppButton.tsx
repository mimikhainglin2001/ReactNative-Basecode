import React, { ReactNode } from "react";

import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "@/presentation/theme/theme";

interface AppButtonProps {
  title?: string;
  children?: ReactNode;

  onPress: () => void;

  loading?: boolean;
  disabled?: boolean;

  variant?: "primary" | "outline" | "ghost" | "destructive";

  fullWidth?: boolean;

  align?: "left" | "center" | "right";

  style?: StyleProp<ViewStyle>;

  accessibilityLabel?: string;
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
  accessibilityLabel,
}: AppButtonProps) {
  /*
   * A loading button should also
   * behave as a disabled button.
   */
  const isDisabled = disabled || loading;

  /*
   * Variant flags.
   */
  const isOutline = variant === "outline";
  const isGhost = variant === "ghost";
  const isDestructive = variant === "destructive";

  /*
   * Background color.
   */
  const backgroundColor =
    isGhost || isOutline
      ? "transparent"
      : isDestructive
        ? Colors.error
        : Colors.primary;

  /*
   * Border color.
   */
  const borderColor = isOutline
    ? Colors.primary
    : isDestructive
      ? Colors.error
      : "transparent";

  /*
   * Text color.
   */
  const textColor = isGhost
    ? Colors.text
    : isOutline
      ? Colors.primary
      : Colors.white;

  /*
   * Alignment.
   */
  const alignmentStyle =
    align === "left"
      ? styles.alignLeft
      : align === "right"
        ? styles.alignRight
        : styles.alignCenter;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        fullWidth && styles.fullWidth,
        alignmentStyle,
        {
          backgroundColor,
          borderColor,
        },
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={textColor} />

          {title ? (
            <Text
              style={[
                styles.text,
                {
                  color: textColor,
                },
              ]}
            >
              {title}
            </Text>
          ) : null}
        </View>
      ) : children ? (
        <View style={styles.childrenContainer}>{children}</View>
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: textColor,
            },
            isGhost && styles.ghostText,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 48,

    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,

    borderRadius: Radius.md,
    borderWidth: 1,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
  },

  fullWidth: {
    width: "100%",
  },

  alignLeft: {
    justifyContent: "flex-start",
  },

  alignCenter: {
    justifyContent: "center",
  },

  alignRight: {
    justifyContent: "flex-end",
  },

  disabled: {
    opacity: 0.5,
  },

  pressed: {
    opacity: 0.8,
  },

  loadingContainer: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    gap: Spacing.sm,
  },

  childrenContainer: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    flex: 1,
  },

  text: {
    fontSize: Typography.body.fontSize,

    fontWeight: "600",
  },

  ghostText: {
    fontWeight: "500",
  },
});
