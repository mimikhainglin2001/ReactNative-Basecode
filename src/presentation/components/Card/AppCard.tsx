import React from "react";

import { View, StyleSheet, ViewStyle } from "react-native";

import { Colors, Radius, Spacing } from "@/presentation/theme/theme";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function AppCard({ children, style }: Props) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
});