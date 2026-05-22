import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AuthScreen from "./src/screens/AuthScreen";
import CartScreen from "./src/screens/cart/CartScreen";
import OrderConfirmedScreen from "./src/screens/cart/OrderConfirmedScreen";
import { CartProvider } from "./src/context/CartContext";
import { OrdersProvider } from "./src/context/OrdersContext";
import DiscoveryScreen from "./src/screens/discovery/DiscoveryScreen";
import MenuScreen from "./src/screens/discovery/MenuScreen";
import RestaurantDetail from "./src/screens/discovery/RestaurantDetail";
import HomeScreen from "./src/screens/HomeScreen";
import OrdersScreen from "./src/screens/OrdersScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SavedScreen from "./src/screens/SavedScreen";
import AppSplashScreen from "./src/screens/SplashScreen";

SplashScreen.preventAutoHideAsync();

const isExpoGo = Constants.appOwnership === "expo";
if (!isExpoGo) {
  SplashScreen.setOptions({ duration: 400, fade: true });
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  const handleLayout = async () => {
    await SplashScreen.hideAsync();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <View style={styles.root} onLayout={handleLayout}>
          <StatusBar style="light" />
          <CartProvider>
            <OrdersProvider>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="Auth"
                  screenOptions={{ headerShown: false, animation: "fade" }}
                >
                  <Stack.Screen name="Auth" component={AuthScreen} />
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Discovery" component={DiscoveryScreen} />
                  <Stack.Screen name="Orders" component={OrdersScreen} />
                  <Stack.Screen name="Saved" component={SavedScreen} />
                  <Stack.Screen name="Profile" component={ProfileScreen} />
                  <Stack.Screen
                    name="RestaurantDetail"
                    component={RestaurantDetail}
                    options={{ animation: "slide_from_bottom" }}
                  />
                  <Stack.Screen
                    name="Menu"
                    component={MenuScreen}
                    options={{ animation: "slide_from_right" }}
                  />
                  <Stack.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{ animation: "slide_from_right" }}
                  />
                  <Stack.Screen
                    name="OrderConfirmed"
                    component={OrderConfirmedScreen}
                    options={{ animation: "slide_from_bottom" }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </OrdersProvider>
          </CartProvider>

          {!splashDone && (
            <AppSplashScreen onFinish={() => setSplashDone(true)} />
          )}
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#120D0A",
  },
});
