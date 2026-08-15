import React from "react";

import { Text, StyleProp, TextStyle } from "react-native";
import { Colors, Typography } from "../theme/theme";

interface Props {
  children: React.ReactNode;

  type?: "title" | "heading" | "body" | "caption";

  style?: StyleProp<TextStyle>;
}

export default function AppText({
  children,

  type = "body",

  style,
}: Props) {
  return (
    <Text
      style={[
        Typography[type],
        {
          color: Colors.text,
        },

        style,
      ]}
    >
      {children}
    </Text>
  );
}
