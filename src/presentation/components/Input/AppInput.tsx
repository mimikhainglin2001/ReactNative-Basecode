import React, { useState } from "react";

import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "@/presentation/theme/theme";

interface AppInputProps extends TextInputProps {
  label?: string;

  error?: string;

  helperText?: string;

  showPasswordToggle?: boolean;

  containerStyle?: StyleProp<ViewStyle>;
}

export default function AppInput({
  label,
  error,
  helperText,
  showPasswordToggle = false,
  containerStyle,
  style,
  secureTextEntry,
  editable = true,
  onFocus,
  onBlur,
  ...props
}: AppInputProps) {
  /*
   * Password visibility state.
   */
  const [isFocused, setIsFocused] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  /*
   * Determine whether this input
   * is being used as a password field.
   */
  const isPasswordField = showPasswordToggle && secureTextEntry === true;

  /*
   * Actual secureTextEntry value.
   */
  const shouldHideText = isPasswordField && !isPasswordVisible;

  /*
   * Handle focus.
   */
  const handleFocus = (
    event: Parameters<NonNullable<TextInputProps["onFocus"]>>[0],
  ) => {
    setIsFocused(true);

    onFocus?.(event);
  };

  /*
   * Handle blur.
   */
  const handleBlur = (
    event: Parameters<NonNullable<TextInputProps["onBlur"]>>[0],
  ) => {
    setIsFocused(false);

    onBlur?.(event);
  };

  /*
   * Border state.
   */
  const inputBorderStyle = error
    ? styles.inputError
    : isFocused
      ? styles.inputFocused
      : styles.inputDefault;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputWrapper,
          inputBorderStyle,
          !editable && styles.inputDisabled,
        ]}
      >
        <TextInput
          {...props}
          secureTextEntry={isPasswordField ? shouldHideText : secureTextEntry}
          editable={editable}
          style={[styles.input, style]}
          placeholderTextColor={
            props.placeholderTextColor ?? Colors.textSecondary
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessibilityLabel={label}
        />

        {isPasswordField ? (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setIsPasswordVisible((previous) => !previous)}
            disabled={!editable}
            accessible
            accessibilityRole="button"
            accessibilityLabel={
              isPasswordVisible ? "Hide password" : "Show password"
            }
          >
            <Text style={styles.eyeText}>
              {isPasswordVisible ? "🙈" : "👁"}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
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

  inputWrapper: {
    flexDirection: "row",

    alignItems: "center",

    borderWidth: 1,

    borderRadius: Radius.md,

    backgroundColor: Colors.surface,
  },

  inputDefault: {
    borderColor: Colors.border,
  },

  inputFocused: {
    borderColor: Colors.primary,
  },

  inputError: {
    borderColor: Colors.error,
  },

  inputDisabled: {
    opacity: 0.5,
  },

  input: {
    flex: 1,

    minHeight: 48,

    paddingHorizontal: Spacing.md,

    paddingVertical: Spacing.md,

    fontSize: Typography.body.fontSize,

    color: Colors.text,
  },

  eyeButton: {
    paddingHorizontal: Spacing.md,

    paddingVertical: Spacing.sm,
  },

  eyeText: {
    fontSize: 20,
  },

  error: {
    ...Typography.caption,

    color: Colors.error,

    marginTop: Spacing.xs,
  },

  helperText: {
    ...Typography.caption,

    color: Colors.textSecondary,

    marginTop: Spacing.xs,
  },
});
