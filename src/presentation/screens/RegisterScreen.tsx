import React, { useState, useMemo } from "react";

import { View, TextInput, StyleSheet } from "react-native";

import { RegisterViewModel } from "../viewmodels/RegisterViewModel";

import AppButton from "../components/Button/AppButton";
import AppMessage from "../components/Error/AppMessage";

export default function RegisterScreen() {
  const vm = useMemo(() => new RegisterViewModel(), []);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const handleRegister = async () => {
    try {
      const user = await vm.register(name, email, password);

      setMessage(`Welcome ${user.name}!`);

      setMessageType("success");
    } catch (error) {
      setMessage("Registration failed.");

      setMessageType("error");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <AppButton title="Register" onPress={handleRegister} />

      {message ? <AppMessage message={message} type={messageType} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
});
