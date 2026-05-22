import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AppSplashScreen from "./src/screens/SplashScreen";

// Keep the native splash screen visible until we're ready
SplashScreen.preventAutoHideAsync();

// Fade out the native splash screen
SplashScreen.setOptions({
  duration: 400,
  fade: true,
});

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Nomzy</Text>
      <StatusBar style="light" />
    </View>
  );
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  // Hide the native splash as soon as the JS bundle is ready
  // (the in-app splash takes over from here)
  const handleLayout = async () => {
    await SplashScreen.hideAsync();
  };

  return (
    <View style={styles.root} onLayout={handleLayout}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* In-app animated splash sits on top until its animation finishes */}
      {!splashDone && (
        <AppSplashScreen onFinish={() => setSplashDone(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f0f0f",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
});
