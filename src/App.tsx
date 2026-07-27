import "reflect-metadata";

import React from "react";


import Toast from "react-native-toast-message";
import RootNavigator from "./presentation/navigation/RootNavigator";

export default function App() {
  return (
    <>
      <RootNavigator />

      <Toast />
    </>
  );
}
