import React from "react";

import { Modal, View, StyleSheet, Pressable } from "react-native";

import AppText from "./AppText";
import { AppButton } from "../components";
import { Colors, Radius, Spacing } from "../theme/theme";

interface Props {
  visible: boolean;

  title: string;

  message: string;

  confirmText?: string;

  cancelText?: string;

  onConfirm: () => void;

  onCancel: () => void;
}

export default function AppModal({
  visible,

  title,

  message,

  confirmText = "Confirm",

  cancelText = "Cancel",

  onConfirm,

  onCancel,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <AppText type="heading">{title}</AppText>

          <AppText>{message}</AppText>

          <View style={styles.actions}>
            <Pressable onPress={onCancel}>
              <AppText>{cancelText}</AppText>
            </Pressable>

            <AppButton title={confirmText} onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.5)",

    justifyContent: "center",

    alignItems: "center",
  },

  container: {
    width: "85%",

    backgroundColor: Colors.surface,

    padding: Spacing.lg,

    borderRadius: Radius.lg,
  },

  actions: {
    marginTop: Spacing.lg,

    gap: Spacing.md,
  },
});
