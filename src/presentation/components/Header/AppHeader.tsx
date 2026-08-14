import { Colors } from "@/presentation/theme/colors";
import { Spacing } from "@/presentation/theme/spacing";
import { Typography } from "@/presentation/theme/typography";
import React from "react";

import { View, Text, StyleSheet } from "react-native";

interface Props {
  title: string;

  subtitle?: string;
}

export default function AppHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },

  title: {
    ...Typography.title,

    color: Colors.text,
    justifyContent: "center",
    textAlign: "center",
  },

  subtitle: {
    ...Typography.body,

    color: Colors.textSecondary,

    marginTop: Spacing.xs,
    textAlign: "center",
  },
});
