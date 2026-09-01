import React from "react";

import { ActivityIndicator, View, StyleSheet } from "react-native";

import { Colors, Spacing } from "@/presentation/theme/theme";

interface Props {
  size?: "small" | "large";
  color?: string;
}

export default function LoadingView({
  size = "large",
  color = Colors.primary,
}: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
});
