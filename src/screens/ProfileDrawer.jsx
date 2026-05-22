import {
    createDrawerNavigator,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Line, Path, Polyline } from "react-native-svg";
import { useAuth } from "../context/AuthContext";
import { C } from "../data/homeData";
import ProfileScreen from "./ProfileScreen";

const Drawer = createDrawerNavigator();

// ─── Icons ────────────────────────────────────────────────────────────────────
function OrderIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <Path d="M9 3h6v4H9z" />
      <Path d="M9 12h6M9 16h4" />
    </Svg>
  );
}

function SettingsIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="12" r="3" />
      <Path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </Svg>
  );
}

function HelpIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="12" r="10" />
      <Path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
      <Line x1="12" y1="17" x2="12.01" y2="17" />
    </Svg>
  );
}

function LogoutIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke="#FF4D6D" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <Polyline points="16 17 21 12 16 7" />
      <Line x1="21" y1="12" x2="9" y2="12" />
    </Svg>
  );
}

// ─── Custom drawer content ────────────────────────────────────────────────────
function CustomDrawerContent({ navigation }) {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const items = [
    { label: "My Orders",  icon: <OrderIcon />,   onPress: () => navigation.navigate("Orders") },
    { label: "Settings",   icon: <SettingsIcon />, onPress: () => navigation.navigate("Profile") },
    { label: "Help",       icon: <HelpIcon />,     onPress: () => navigation.navigate("HomeTab", { screen: "Help" }) },
  ];

  return (
    <DrawerContentScrollView
      scrollEnabled={false}
      contentContainerStyle={styles.drawerRoot}
    >
      {/* Avatar + user info */}
      <View style={styles.drawerHeader}>
        <LinearGradient colors={[C.orange, "#D87F12"]} style={styles.avatar}>
          <Text style={styles.avatarText}>J</Text>
        </LinearGradient>
        <Text style={styles.drawerName}>Jahan</Text>
        <Text style={styles.drawerEmail}>jahan@nomzy.app</Text>
      </View>

      <View style={styles.divider} />

      {/* Nav items */}
      <View style={styles.drawerItems}>
        {items.map((item) => (
          <Pressable key={item.label} style={styles.drawerItem} onPress={item.onPress}>
            <View style={styles.drawerItemIcon}>{item.icon}</View>
            <Text style={styles.drawerItemLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.divider} />

      {/* Logout */}
      <Pressable style={styles.drawerItem} onPress={handleLogout}>
        <View style={[styles.drawerItemIcon, styles.drawerItemIconDanger]}>
          <LogoutIcon />
        </View>
        <Text style={[styles.drawerItemLabel, styles.drawerItemLabelDanger]}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
}

// ─── Drawer navigator wrapping ProfileScreen ──────────────────────────────────
export default function ProfileDrawer({ navigation: parentNav }) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} navigation={parentNav} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerStyle: {
          backgroundColor: C.surface,
          width: 280,
          borderLeftWidth: 1,
          borderLeftColor: C.border,
        },
        overlayColor: "rgba(0,0,0,0.6)",
      }}
    >
      <Drawer.Screen name="ProfileMain" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerRoot: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 20,
    backgroundColor: C.surface,
  },
  drawerHeader: {
    alignItems: "center",
    paddingBottom: 24,
    gap: 6,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    shadowColor: C.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: "800",
    color: C.white,
  },
  drawerName: {
    fontSize: 18,
    fontWeight: "800",
    color: C.white,
    letterSpacing: 0.2,
  },
  drawerEmail: {
    fontSize: 12.5,
    color: C.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 16,
  },
  drawerItems: {
    gap: 4,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 13,
    paddingHorizontal: 4,
    borderRadius: 12,
  },
  drawerItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerItemIconDanger: {
    backgroundColor: "rgba(255,77,109,0.1)",
    borderColor: "rgba(255,77,109,0.2)",
  },
  drawerItemLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: C.white,
    letterSpacing: 0.1,
  },
  drawerItemLabelDanger: {
    color: "#FF4D6D",
  },
});
