import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/home/HomeScreen";
import NotificationScreen from "../screens/notification/NotificationScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";

import { Colors } from "../theme/theme";

export type BottomTabParamList = {
  Home: undefined;

  Notification: undefined;

  Profile: undefined;

  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: Colors.primary,

        tabBarInactiveTintColor: Colors.textSecondary,

        tabBarStyle: {
          height: 65,

          paddingBottom: 8,

          paddingTop: 8,
        },

        tabBarIcon: ({ color, size }) => {
          let icon: keyof typeof Ionicons.glyphMap = "home";

          switch (route.name) {
            case "Notification":
              icon = "notifications";

              break;

            case "Profile":
              icon = "person";

              break;

            case "Settings":
              icon = "settings";

              break;
          }

          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen name="Notification" component={NotificationScreen} />

      <Tab.Screen name="Profile" component={ProfileScreen} />

      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
