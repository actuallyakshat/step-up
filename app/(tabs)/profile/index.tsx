import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/auth";

export default function Profile() {
  const { logout } = useAuthStore();

  return (
    <SafeAreaView className="flex-1">
      <View className="px-5 py-7 flex-1 justify-center">
        <TouchableOpacity
          className="bg-lime-600 w-full p-4 rounded-xl"
          onPress={logout}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
