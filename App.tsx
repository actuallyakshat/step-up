import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState, useEffect } from "react";

import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";

export default function App() {
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
    <View style={styles.container}>
      <Text style={styles.title}>Step Counter</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {stepCount !== null ? (
        <Text style={styles.stepText}>Today's Steps: {stepCount}</Text>
      ) : (
        <Text>Loading step count...</Text>
      )}

      <Button
        title="Refresh Step Count"
        onPress={fetchStepData}
        disabled={!authorized}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  stepText: {
    fontSize: 18,
    margin: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
});
