import React, { useState } from "react";

import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TextInputProps,
  TouchableOpacity,
} from "react-native";

import { Colors, Spacing, Typography } from "@/presentation/theme/theme";

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
}

export default function AppInput({
  label,
  error,
  style,
  showPasswordToggle,
  ...props
}: Props) {
  const [secureTextEntry, setSecureTextEntry] = useState(
    props.secureTextEntry ?? false,
  );

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const inputStyle = [
    styles.input,
    error ? styles.inputError : null,
    style,
  ];

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={styles.inputWrapper}>
        <TextInput
          {...props}
          secureTextEntry={secureTextEntry}
          style={inputStyle}
          placeholderTextColor={
            props.placeholderTextColor ?? Colors.textSecondary
          }
        />

        {showPasswordToggle && props.secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
            accessible={true}
            accessibilityLabel={
              secureTextEntry ? "Show password" : "Hide password"
            }
          >
            <Text
              style={[
                styles.eyeText,
                secureTextEntry ? styles.eyeTextVisible : styles.eyeTextHidden,
              ]}
            >
              {secureTextEntry ? "👁" : "🙈"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

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

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.surface,
  },

  input: {
    flex: 1,
    padding: Spacing.md,
    fontSize: Typography.body.fontSize,
    color: Colors.text,
  },

  inputError: {
    borderColor: Colors.error,
  },

  eyeIcon: {
    padding: Spacing.md,
  },

  eyeText: {
    fontSize: 20,
  },

  eyeTextVisible: {
    opacity: 0.5,
  },

  eyeTextHidden: {
    opacity: 0.5,
  },

  error: {
    ...Typography.caption,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
});
