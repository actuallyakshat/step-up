import { authApi } from "@/api/auth";
import { useAuth } from "@/api/hooks/useAuth";
import { useAuthStore } from "@/store/auth";
import { Ionicons } from "@expo/vector-icons";
import { AxiosError } from "axios";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { login } = useAuthStore();

  const validateForm = () => {
    if (username.includes(" ")) {
      Alert.alert("Invalid Username", "Username cannot contain spaces", [
        { text: "OK" },
      ]);
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 6 characters",
        [{ text: "OK" }]
      );
      return;
    }
  };

  const handleLogin = async () => {
    //validate
    validateForm();

    //call api
    setLoading(true);
    try {
      const response = await authApi.login({ username, password });
      login(response.user, response.token);
    } catch (error: AxiosError | any) {
      Alert.alert("Login Failed!", error.message, [{ text: "OK" }]);
      return;
    } finally {
      setLoading(false);
    }
    //take action
    router.replace("/(tabs)");
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-24">
        {/* Header */}
        <View className="items-center mb-10">
          <View className="bg-lime-600 p-4 rounded-full mb-4">
            <Ionicons name="footsteps" size={40} color="white" />
          </View>
          <Text className="text-2xl font-bold text-gray-800">
            Welcome Back!
          </Text>
          <Text className="text-gray-500 mt-2">Sign in to continue</Text>
        </View>

        {/* Form */}
        <View className="gap-4">
          <View className="gap-y-2">
            <Text className="text-gray-700 font-medium ml-1">Username</Text>
            <TextInput
              className="bg-gray-50 p-4 rounded-xl border border-gray-200"
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              keyboardType="default"
            />
          </View>

          <View className="gap-y-2">
            <Text className="text-gray-700 font-medium ml-1">Password</Text>
            <TextInput
              className="bg-gray-50 p-4 rounded-xl border border-gray-200"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className="bg-lime-600 p-4 rounded-xl"
            onPress={handleLogin}
          >
            {!loading ? (
              <Text className="text-white text-center font-semibold text-lg">
                Sign In
              </Text>
            ) : (
              <ActivityIndicator size="small" color="white" />
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text className="text-lime-600 font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
