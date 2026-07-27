import React from "react";

import { Button } from "react-native";

import { AuthService } from "@/auth/services/auth.service";

export default function LogoutButton() {
  const handleLogout = async () => {
    const service = new AuthService();

    await service.logout();
  };

  return <Button title="Logout" onPress={handleLogout} />;
}
