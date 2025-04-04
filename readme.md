# React Native Health Setup Guide

This guide outlines the necessary steps to properly configure the `react-native-health` package for iOS integration with HealthKit.

## Step 1: Replace the index.js file

In the `react-native-health` package, replace the default `index.js` file with the following code:

```javascript
import { Activities, Observers, Permissions, Units } from "./src/constants";

const { AppleHealthKit } = require("react-native").NativeModules;

export const HealthKit = {
  initHealthKit: AppleHealthKit.initHealthKit,
  isAvailable: AppleHealthKit.isAvailable,
  getBiologicalSex: AppleHealthKit.getBiologicalSex,
  getBloodType: AppleHealthKit.getBloodType,
  getDateOfBirth: AppleHealthKit.getDateOfBirth,
  getLatestWeight: AppleHealthKit.getLatestWeight,
  getWeightSamples: AppleHealthKit.getWeightSamples,
  saveWeight: AppleHealthKit.saveWeight,
  getLatestHeight: AppleHealthKit.getLatestHeight,
  getHeightSamples: AppleHealthKit.getHeightSamples,
  saveHeight: AppleHealthKit.saveHeight,
  getLatestWaistCircumference: AppleHealthKit.getLatestWaistCircumference,
  getWaistCircumferenceSamples: AppleHealthKit.getWaistCircumferenceSamples,
  saveWaistCircumference: AppleHealthKit.saveWaistCircumference,
  getLatestPeakFlow: AppleHealthKit.getLatestPeakFlow,
  getPeakFlowSamples: AppleHealthKit.getPeakFlowSamples,
  savePeakFlow: AppleHealthKit.savePeakFlow,
  saveLeanBodyMass: AppleHealthKit.saveLeanBodyMass,
  getLatestBmi: AppleHealthKit.getLatestBmi,
  getBmiSamples: AppleHealthKit.getBmiSamples,
  saveBmi: AppleHealthKit.saveBmi,
  getLatestBodyFatPercentage: AppleHealthKit.getLatestBodyFatPercentage,
  getBodyFatPercentageSamples: AppleHealthKit.getBodyFatPercentageSamples,
  getLatestLeanBodyMass: AppleHealthKit.getLatestLeanBodyMass,
  getLeanBodyMassSamples: AppleHealthKit.getLeanBodyMassSamples,
  getStepCount: AppleHealthKit.getStepCount,
  getSamples: AppleHealthKit.getSamples,
  getAnchoredWorkouts: AppleHealthKit.getAnchoredWorkouts,
  getDailyStepCountSamples: AppleHealthKit.getDailyStepCountSamples,
  saveSteps: AppleHealthKit.saveSteps,
  saveWalkingRunningDistance: AppleHealthKit.saveWalkingRunningDistance,
  getDistanceWalkingRunning: AppleHealthKit.getDistanceWalkingRunning,
  getDailyDistanceWalkingRunningSamples:
    AppleHealthKit.getDailyDistanceWalkingRunningSamples,
  getDistanceCycling: AppleHealthKit.getDistanceCycling,
  getDailyDistanceCyclingSamples: AppleHealthKit.getDailyDistanceCyclingSamples,
  getFlightsClimbed: AppleHealthKit.getFlightsClimbed,
  getDailyFlightsClimbedSamples: AppleHealthKit.getDailyFlightsClimbedSamples,
  getEnergyConsumedSamples: AppleHealthKit.getEnergyConsumedSamples,
  getProteinSamples: AppleHealthKit.getProteinSamples,
  getFiberSamples: AppleHealthKit.getFiberSamples,
  getTotalFatSamples: AppleHealthKit.getTotalFatSamples,
  saveFood: AppleHealthKit.saveFood,
  saveWater: AppleHealthKit.saveWater,
  getWater: AppleHealthKit.getWater,
  saveHeartRateSample: AppleHealthKit.saveHeartRateSample,
  getWaterSamples: AppleHealthKit.getWaterSamples,
  getHeartRateSamples: AppleHealthKit.getHeartRateSamples,
  getRestingHeartRate: AppleHealthKit.getRestingHeartRate,
  getWalkingHeartRateAverage: AppleHealthKit.getWalkingHeartRateAverage,
  getActiveEnergyBurned: AppleHealthKit.getActiveEnergyBurned,
  getBasalEnergyBurned: AppleHealthKit.getBasalEnergyBurned,
  getAppleExerciseTime: AppleHealthKit.getAppleExerciseTime,
  getAppleStandTime: AppleHealthKit.getAppleStandTime,
  getVo2MaxSamples: AppleHealthKit.getVo2MaxSamples,
  getBodyTemperatureSamples: AppleHealthKit.getBodyTemperatureSamples,
  getBloodPressureSamples: AppleHealthKit.getBloodPressureSamples,
  getRespiratoryRateSamples: AppleHealthKit.getRespiratoryRateSamples,
  getHeartRateVariabilitySamples: AppleHealthKit.getHeartRateVariabilitySamples,
  getHeartbeatSeriesSamples: AppleHealthKit.getHeartbeatSeriesSamples,
  getRestingHeartRateSamples: AppleHealthKit.getRestingHeartRateSamples,
  getBloodGlucoseSamples: AppleHealthKit.getBloodGlucoseSamples,
  getCarbohydratesSamples: AppleHealthKit.getCarbohydratesSamples,
  saveBloodGlucoseSample: AppleHealthKit.saveBloodGlucoseSample,
  saveCarbohydratesSample: AppleHealthKit.saveCarbohydratesSample,
  deleteBloodGlucoseSample: AppleHealthKit.deleteBloodGlucoseSample,
  deleteCarbohydratesSample: AppleHealthKit.deleteCarbohydratesSample,
  getSleepSamples: AppleHealthKit.getSleepSamples,
  getInfo: AppleHealthKit.getInfo,
  getMindfulSession: AppleHealthKit.getMindfulSession,
  saveMindfulSession: AppleHealthKit.saveMindfulSession,
  getWorkoutRouteSamples: AppleHealthKit.getWorkoutRouteSamples,
  saveWorkout: AppleHealthKit.saveWorkout,
  getAuthStatus: AppleHealthKit.getAuthStatus,
  getLatestBloodAlcoholContent: AppleHealthKit.getLatestBloodAlcoholContent,
  getBloodAlcoholContentSamples: AppleHealthKit.getBloodAlcoholContentSamples,
  saveBloodAlcoholContent: AppleHealthKit.saveBloodAlcoholContent,
  getDistanceSwimming: AppleHealthKit.getDistanceSwimming,
  getDailyDistanceSwimmingSamples:
    AppleHealthKit.getDailyDistanceSwimmingSamples,
  getOxygenSaturationSamples: AppleHealthKit.getOxygenSaturationSamples,
  getElectrocardiogramSamples: AppleHealthKit.getElectrocardiogramSamples,
  saveBodyFatPercentage: AppleHealthKit.saveBodyFatPercentage,
  saveBodyTemperature: AppleHealthKit.saveBodyTemperature,
  getEnvironmentalAudioExposure: AppleHealthKit.getEnvironmentalAudioExposure,
  getHeadphoneAudioExposure: AppleHealthKit.getHeadphoneAudioExposure,
  getClinicalRecords: AppleHealthKit.getClinicalRecords,
  getActivitySummary: AppleHealthKit.getActivitySummary,
  getInsulinDeliverySamples: AppleHealthKit.getInsulinDeliverySamples,
  saveInsulinDeliverySample: AppleHealthKit.saveInsulinDeliverySample,
  deleteInsulinDeliverySample: AppleHealthKit.deleteInsulinDeliverySample,

  Constants: {
    Activities,
    Observers,
    Permissions,
    Units,
  },
};

module.exports = HealthKit;
```

## Step 2: Build the iOS app

After replacing the index.js file, build the iOS app:

```bash
pnpm ios
```

## Step 3: Configure Info.plist

Add the following entries to your `Info.plist` file to request HealthKit permissions:

```xml
<key>NSHealthShareUsageDescription</key>
<string>Read and understand health data.</string>
<key>NSHealthUpdateUsageDescription</key>
<string>Share workout data with other apps.</string>
<!-- Only required if requesting clinical health data -->
<key>NSHealthClinicalHealthRecordsShareUsageDescription</key>
<string>Read and understand clinical health data.</string>
```

## Step 4: Enable HealthKit capability

1. Open your project in Xcode
2. Select your project in the Project Navigator
3. Select your app target
4. Go to the "Signing & Capabilities" tab
5. Click the "+ Capability" button
6. Search for and add "HealthKit"

## Troubleshooting

If you encounter build issues after adding Firebase or other dependencies:

1. Clean the build folder in Xcode: Product → Clean Build Folder
2. Reinstall pods:
   ```bash
   cd ios
   pod deintegrate
   pod install
   cd ..
   ```
3. Rebuild the app:
   ```bash
   pnpm ios
   ```

## Next Steps

After successful setup, you can initialize HealthKit in your app and request permissions for the specific health data types you need.
