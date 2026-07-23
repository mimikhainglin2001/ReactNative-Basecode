import React, { useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { LoginViewModel } from "../viewmodels/LoginViewModel";

import AppButton from "../components/Button/AppButton";
import AppMessage from "../components/Error/AppMessage";

export default function LoginScreen() {
  const vm = useMemo(() => new LoginViewModel(), []);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const handleLogin = async () => {
    try {
      const user = await vm.login("test@test.com", "123456");

      setMessage(`Welcome ${user.name}!`);

      setMessageType("success");
    } catch (e) {
      setMessage("Login failed.");

      setMessageType("error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EnterpriseRN</Text>

      <AppButton title="Login" onPress={handleLogin} />

      {message ? <AppMessage message={message} type={messageType} /> : null}
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
