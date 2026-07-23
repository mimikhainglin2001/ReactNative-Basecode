import React from "react";

import { ActivityIndicator, View } from "react-native";

export default function LoadingView() {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
}
