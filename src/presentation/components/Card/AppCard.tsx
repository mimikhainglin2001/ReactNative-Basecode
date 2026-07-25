import React from "react";

import { View, StyleSheet } from "react-native";

interface Props {
  children: React.ReactNode;
}

export default function AppCard({ children }: Props) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    padding: 16,

    borderRadius: 12,

    backgroundColor: "#fff",

    shadowOpacity: 0.1,

    elevation: 3,
  },
});
