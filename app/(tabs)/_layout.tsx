import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          paddingTop: 10,
          height: 90,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarActiveTintColor: "green", // Add a distinct active color
        tabBarInactiveTintColor: "#888888", // Add inactive color
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome name="home" color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard/index"
        options={{
          title: "Leaderboard",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome name="bar-chart" color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome name="user" color={color} size={size} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
