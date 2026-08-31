import React from "react";

import { StyleSheet, ViewStyle } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Spacing } from "@/presentation/theme/theme";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function AppScreen({ children, style }: Props) {
  return (
    <SafeAreaView style={[styles.container, style]} edges={["top"]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
});