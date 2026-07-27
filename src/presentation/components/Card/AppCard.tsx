import React from "react";

import { View, StyleSheet } from "react-native";

import { Colors, Radius, Spacing } from "@/presentation/theme/theme";

interface Props {
  children: React.ReactNode;
}

export default function AppCard({ children }: Props) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,

    padding: Spacing.lg,

    borderRadius: Radius.lg,

    marginTop: Spacing.md,

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
