import React from "react";

import { StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Spacing } from "@/presentation/theme/theme";

interface Props {
  children: React.ReactNode;
}

export default function AppScreen({ children }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
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
