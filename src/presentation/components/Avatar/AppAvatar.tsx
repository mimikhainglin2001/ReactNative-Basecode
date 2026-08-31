import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { Colors, Typography, Spacing, Radius } from "@/presentation/theme/theme";

interface Props {
  name?: string;

  size?: number;

  source?: { uri: string };
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getColorFromName(name: string): string {
  const colors = [
    "#2563EB",
    "#16A34A",
    "#DC2626",
    "#F59E0B",
    "#9333EA",
    "#EC4899",
    "#0891B2",
    "#65A30D",
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function AppAvatar({ name, size = 56, source }: Props) {
  const initials = name ? getInitials(name) : "?";
  const bgColor = name ? getColorFromName(name) : Colors.secondary;

  if (source?.uri) {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={[styles.imageWrapper, { width: size, height: size }]}>
          <View
            style={{
              width: "100%",
              height: "100%",
              borderRadius: size / 2,
              overflow: "hidden",
            }}
          >
            <Text style={{ width: "100%", height: "100%", opacity: 0 }}>.</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, backgroundColor: bgColor },
      ]}
    >
      <Text
        style={[
          styles.initials,
          {
            fontSize: size * 0.35,
            color: Colors.white,
            fontWeight: Typography.heading.fontWeight,
          },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imageWrapper: {
    borderRadius: 9999,
    overflow: "hidden",
  },
  initials: {
    lineHeight: 0,
    includeFontPadding: false,
  },
});