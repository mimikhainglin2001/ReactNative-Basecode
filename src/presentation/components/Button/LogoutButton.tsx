import React from "react";

import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { AuthService } from "@/auth/services/auth.service";

import { Colors, Spacing, Typography } from "@/presentation/theme/theme";
import container from "@/core/di/container";

export default function LogoutButton() {
  const handleLogout = async () => {
    const service = container.resolve<AuthService>("AuthService");
    await service.logout();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.error,

    padding: Spacing.md,

    borderRadius: 8,

    marginTop: Spacing.md,
  },

  text: {
    color: Colors.white,

    fontSize: Typography.body.fontSize,

    fontWeight: "600",
  },
});
