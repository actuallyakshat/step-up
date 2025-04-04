import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState, useEffect } from "react";

import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [stepCount, setStepCount] = useState<number | null>(null);
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize HealthKit when component mounts
  useEffect(() => {
    const permissions = {
      permissions: {
        read: [AppleHealthKit.Constants.Permissions.StepCount],
        write: [],
      },
    } as HealthKitPermissions;

    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      if (error) {
        console.log("[ERROR] Cannot grant permissions!", error);
        setError("Failed to initialize HealthKit: " + error);
        return;
      }

      console.log("HealthKit initialized successfully");
      setAuthorized(true);
      // Fetch step data right away
      fetchStepData();
    });
  }, []);

  const fetchStepData = () => {
    const today = new Date();
    const options = {
      date: today.toISOString(), // Get today's steps
      includeManuallyAdded: true,
    };

    AppleHealthKit.getStepCount(
      options,
      (error: string, result: HealthValue) => {
        if (error) {
          console.log("[ERROR] Cannot get step count!", error);
          setError("Failed to get step count: " + error);
          return;
        }

        console.log("Step count result:", result);
        setStepCount(result.value);
      }
    );
  };

  return (
    <SafeAreaView>
      <Text className="text-3xl">Step Counter</Text>

      {error && <Text>{error}</Text>}

      {stepCount !== null ? (
        <Text>Today's Steps: {stepCount}</Text>
      ) : (
        <Text>Loading step count...</Text>
      )}

      <Button
        title="Refresh Step Count"
        onPress={fetchStepData}
        disabled={!authorized}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
