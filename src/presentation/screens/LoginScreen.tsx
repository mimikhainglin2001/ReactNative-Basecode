import React, { useMemo } from "react";
import { View, Button, StyleSheet, Text } from "react-native";

import { LoginViewModel } from "../viewmodels/LoginViewModel";

export default function LoginScreen() {
  const vm = useMemo(() => new LoginViewModel(), []);

  const handleLogin = async () => {
    try {
      const user = await vm.login("test@test.com", "123456");
      console.log(user);
    } catch (e) {
      console.error("Login failed:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EnterpriseRN</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
