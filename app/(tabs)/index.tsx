import { useAuthStore } from "@/store/auth";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AppleHealthKit from "react-native-health";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [stepCount, setStepCount] = useState(7435);
  const [weeklySteps, setWeeklySteps] = useState(35782);
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState<string>("");
  const { logout } = useAuthStore();

  // Initialize HealthKit when component mounts
  useEffect(() => {
    const permissions = {
      permissions: {
        read: [AppleHealthKit.Constants.Permissions.StepCount],
        write: [],
      },
    };

    AppleHealthKit.initHealthKit(permissions, (error) => {
      if (error) {
        console.log("[ERROR] Cannot grant permissions!", error);
        setError("Failed to initialize HealthKit: " + error);
        return;
      }

      console.log("HealthKit initialized successfully");
      setAuthorized(true);
      fetchStepData();
    });
  }, []);

  const fetchStepData = () => {
    const today = new Date();
    const options = {
      date: today.toISOString(),
      includeManuallyAdded: true,
    };

    AppleHealthKit.getStepCount(options, (error, result) => {
      if (error) {
        console.log("[ERROR] Cannot get step count!", error);
        setError("Failed to get step count: " + error);
        return;
      }

      console.log("Step count result:", result);
      setStepCount(result.value);
    });
  };

  // Calculate percentage of 10,000 step goal
  const stepPercentage = Math.min(100, (stepCount / 10000) * 100);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-7 flex-1">
        <Text className="text-[2.75rem] font-extrabold tracking-tight">
          Hey <Text className="text-lime-600">Akshat</Text> 👋🏼
        </Text>
        <View className="justify-between mt-5 gap-4">
          <View className=" bg-white rounded-2xl p-4 shadow-lg">
            <Text className="text-lg font-semibold">Today's Steps</Text>
            <Text className="text-3xl font-bold mt-2 text-lime-600">
              {stepCount}
            </Text>
          </View>
          <View className=" bg-white rounded-2xl p-4 shadow-lg">
            <Text className="text-lg font-semibold">Weekly Steps</Text>
            <Text className="text-3xl font-bold mt-2 text-lime-600">
              {weeklySteps}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="bg-lime-600 p-4 rounded-xl"
          onPress={logout}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
