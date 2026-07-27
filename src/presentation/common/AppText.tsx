import React from "react";

import { Text } from "react-native";
import { Colors, Typography } from "../theme/theme";

interface Props {
  children: React.ReactNode;

  type?: "title" | "heading" | "body" | "caption";
}

export default function AppText({
  children,

  type = "body",
}: Props) {
  return (
    <Text
      style={[
        Typography[type],
        {
          color: Colors.text,
        },
      ]}
    >
      {children}
    </Text>
  );
}
