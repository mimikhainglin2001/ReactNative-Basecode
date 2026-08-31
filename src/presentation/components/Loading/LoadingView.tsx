import React from "react";

import { ActivityIndicator, View, StyleSheet } from "react-native";

import { Spacing } from "@/presentation/theme/theme";

interface Props {
  size?: "small" | "large";
  color?: string;
}

export default function LoadingView({ size = "large", color }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
  },
});