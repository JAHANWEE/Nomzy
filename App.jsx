import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AuthScreen from "./src/screens/AuthScreen";
import AppSplashScreen from "./src/screens/SplashScreen";

// Keep the native splash screen visible until we're ready
SplashScreen.preventAutoHideAsync();

// setOptions only works in standalone/dev builds, not Expo Go
const isExpoGo = Constants.appOwnership === "expo";
if (!isExpoGo) {
  SplashScreen.setOptions({ duration: 400, fade: true });
}

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

  const handleLayout = async () => {
    await SplashScreen.hideAsync();
  };

  return (
    <SafeAreaProvider>
      <View style={styles.root} onLayout={handleLayout}>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Auth"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>

        {/* In-app animated splash sits on top until its animation finishes */}
        {!splashDone && (
          <AppSplashScreen onFinish={() => setSplashDone(true)} />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#120D0A",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#120D0A",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
});
