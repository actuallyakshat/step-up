import { useAuthStore } from "@/store/auth";
import { FontAwesome } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

export default function TabsLayout() {
  const { isLoggedIn } = useAuthStore();
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (!isLoggedIn) {
      router.replace("/(auth)/login");
    }
  }, [isLoggedIn, isMounted]);

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
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
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
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
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
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome name="user" color={color} size={size} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
