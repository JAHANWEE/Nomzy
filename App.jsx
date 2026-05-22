import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import BottomNav, { TabIcon } from "./src/components/navigation/BottomNav";
import Sidebar from "./src/components/Sidebar";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import { OrdersProvider, useOrders } from "./src/context/OrdersContext";
import { SidebarProvider } from "./src/context/SidebarContext";
import AuthScreen from "./src/screens/AuthScreen";
import CartScreen from "./src/screens/cart/CartScreen";
import OrderConfirmedScreen from "./src/screens/cart/OrderConfirmedScreen";
import DiscoveryScreen from "./src/screens/discovery/DiscoveryScreen";
import MenuScreen from "./src/screens/discovery/MenuScreen";
import RestaurantDetail from "./src/screens/discovery/RestaurantDetail";
import HomeScreen from "./src/screens/HomeScreen";
import HelpScreen from "./src/screens/HelpScreen";
import OrdersScreen from "./src/screens/OrdersScreen";
import ProfileDrawer from "./src/screens/ProfileDrawer";
import SavedScreen from "./src/screens/SavedScreen";
import AppSplashScreen from "./src/screens/SplashScreen";

SplashScreen.preventAutoHideAsync();

const isExpoGo = Constants.appOwnership === "expo";
if (!isExpoGo) {
  SplashScreen.setOptions({ duration: 400, fade: true });
}

const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const navigationRef = createNavigationContainerRef();

const linking = {
  prefixes: [Linking.createURL("/"), "nomzy://", "foodapp://"],
  config: {
    screens: {
      HomeTab: {
        screens: {
          RestaurantDetail: "restaurant/:id",
        },
      },
    },
  },
};

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetail}
        options={{ animation: "slide_from_bottom" }}
      />
      <HomeStack.Screen
        name="Menu"
        component={MenuScreen}
        options={{ animation: "slide_from_right" }}
      />
      <HomeStack.Screen
        name="Cart"
        component={CartScreen}
        options={{ animation: "slide_from_right" }}
      />
      <HomeStack.Screen
        name="OrderConfirmed"
        component={OrderConfirmedScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      <HomeStack.Screen
        name="Help"
        component={HelpScreen}
        options={{ animation: "slide_from_right" }}
      />
    </HomeStack.Navigator>
  );
}

function MainTabs() {
  const { orders } = useOrders();

  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => <TabIcon name={route.name} color={color} />,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="Search"
        component={DiscoveryScreen}
        options={{ title: "Search" }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ title: "Orders", tabBarBadge: orders.length || undefined }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{ title: "Saved" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileDrawer}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
      <AuthStack.Screen name="Auth" component={AuthScreen} />
    </AuthStack.Navigator>
  );
}

function GuardedNavigation() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <NavigationContainer ref={navigationRef} linking={isLoggedIn ? linking : undefined}>
      {isLoggedIn ? (
        <SidebarProvider>
          <MainTabsWithSidebar />
        </SidebarProvider>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

// Renders MainTabs + the sidebar overlay on top
function MainTabsWithSidebar() {
  return (
    <View style={{ flex: 1 }}>
      <MainTabs />
      <Sidebar navigation={navigationRef} />
    </View>
  );
}

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
          <AuthProvider>
            <CartProvider>
              <OrdersProvider>
                <GuardedNavigation />
              </OrdersProvider>
            </CartProvider>
          </AuthProvider>

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
