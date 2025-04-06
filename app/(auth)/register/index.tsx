import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Register() {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errors, setErrors] = React.useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    };

    // Name validation
    if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Username validation
    if (username.length < 6) {
      newErrors.username = "Username must be at least 6 characters";
      isValid = false;
    }
    if (username.includes(" ")) {
      newErrors.username = "Username cannot contain spaces";
      isValid = false;
    }

    // Password validation
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = () => {
    if (validateForm()) {
      // Handle registration logic here
      console.log("Form is valid");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-10">
        {/* Header */}
        <View className="items-center mb-8">
          <View className="bg-lime-600 p-4 rounded-full mb-4">
            <Ionicons name="footsteps" size={40} color="white" />
          </View>
          <Text className="text-2xl font-bold text-gray-800">
            Create Account
          </Text>
          <Text className="text-gray-500 mt-2">Sign up to get started</Text>
        </View>

        {/* Form */}
        <View className="gap-y-4">
          <View className="gap-y-2">
            <Text className="text-gray-700 font-medium ml-1">Full Name</Text>
            <TextInput
              className="bg-gray-50 p-4 rounded-xl border border-gray-200"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
            />
            {errors.name ? (
              <Text className="text-red-500 text-sm ml-1">{errors.name}</Text>
            ) : null}
          </View>

          <View className="gap-y-2">
            <Text className="text-gray-700 font-medium ml-1">Username</Text>
            <TextInput
              className="bg-gray-50 p-4 rounded-xl border border-gray-200"
              placeholder="Choose a username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.username ? (
              <Text className="text-red-500 text-sm ml-1">
                {errors.username}
              </Text>
            ) : null}
          </View>

          <View className="gap-y-2">
            <Text className="text-gray-700 font-medium ml-1">Password</Text>
            <TextInput
              className="bg-gray-50 p-4 rounded-xl border border-gray-200"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {errors.password ? (
              <Text className="text-red-500 text-sm ml-1">
                {errors.password}
              </Text>
            ) : null}
          </View>

          <View className="gap-y-2">
            <Text className="text-gray-700 font-medium ml-1">
              Confirm Password
            </Text>
            <TextInput
              className="bg-gray-50 p-4 rounded-xl border border-gray-200"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword ? (
              <Text className="text-red-500 text-sm ml-1">
                {errors.confirmPassword}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            className="bg-lime-600 p-4 rounded-xl mt-4"
            onPress={handleRegister}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text className="text-lime-600 font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
