import React from "react";

import { View, Text } from "react-native";

import LogoutButton from "../components/Button/LogoutButton";

export default function HomeScreen() {
  return (
    <View>
      <Text>Welcome Home</Text>

      <LogoutButton />
    </View>
  );
}
