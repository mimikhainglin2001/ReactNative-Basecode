import React from "react";

import { View, StyleSheet } from "react-native";

import AppText from "./AppText";

import { Colors, Spacing } from "../theme/theme";
import { AppButton } from "../components";

interface Props {
  title?: string;

  message?: string;

  onRetry?: () => void;
}

export default function AppError({
  title = "Something went wrong",

  message = "Please try again later.",

  onRetry,
}: Props) {
  return (
    <View style={styles.container}>
      <AppText type="title">❌</AppText>

      <AppText type="heading">{title}</AppText>

      <AppText type="body">{message}</AppText>

      {onRetry && (
        <View style={styles.button}>
          <AppButton title="Retry" onPress={onRetry} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    padding: Spacing.lg,
  },

  button: {
    marginTop: Spacing.md,

    width: 150,
  },
});
