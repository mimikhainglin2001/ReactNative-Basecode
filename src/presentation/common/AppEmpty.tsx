import React from "react";

import { View, StyleSheet } from "react-native";

import AppText from "./AppText";

import { Colors, Spacing } from "../theme/theme";

interface Props {
  title: string;

  description?: string;
}

export default function AppEmpty({
  title,

  description,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <AppText type="title">📭</AppText>
      </View>

      <AppText type="heading">{title}</AppText>

      {description && <AppText type="body">{description}</AppText>}
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

  icon: {
    marginBottom: Spacing.md,
  },
});
