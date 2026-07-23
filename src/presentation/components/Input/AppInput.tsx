import { Spacing, Colors } from "@/presentation/theme/theme";
import React from "react";

import { TextInput, StyleSheet } from "react-native";

interface Props {
  value: string;

  onChangeText: (value: string) => void;

  placeholder: string;

  secureTextEntry?: boolean;
}

export default function AppInput(props: Props) {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,

    borderColor: Colors.border,

    padding: Spacing.md,

    borderRadius: 8,

    backgroundColor: Colors.background,
  },
});
