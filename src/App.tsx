import "reflect-metadata";

import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./presentation/navigation/RootNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
