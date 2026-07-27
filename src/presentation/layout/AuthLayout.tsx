import React from "react";

import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  StyleSheet,
} from "react-native";
import { Colors } from "../theme/theme";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,

    backgroundColor: Colors.background,
  },

  scroll: {
    flexGrow: 1,

    justifyContent: "center",
  },

  container: {
    paddingHorizontal: 20,
  },
});
