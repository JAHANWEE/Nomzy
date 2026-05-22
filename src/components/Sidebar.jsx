import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Line, Path, Polyline } from "react-native-svg";
import { useAuth } from "../context/AuthContext";
import { useSidebar } from "../context/SidebarContext";
import { C } from "../data/homeData";

const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = 300;

// ─── Icons ────────────────────────────────────────────────────────────────────
function HomeIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <Polyline points="9 22 9 12 15 12 15 22" />
    </Svg>
  );
}

function SearchIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="11" cy="11" r="8" />
      <Path d="M21 21l-4.35-4.35" />
    </Svg>
  );
}

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

function ProfileIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <Circle cx="12" cy="7" r="4" />
    </Svg>
  );
}

function SavedIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
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

function CloseIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={2} strokeLinecap="round">
      <Line x1="18" y1="6" x2="6" y2="18" />
      <Line x1="6" y1="6" x2="18" y2="18" />
    </Svg>
  );
}

// ─── Single nav row ───────────────────────────────────────────────────────────
function SidebarItem({ icon, label, onPress, danger }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
      onPress={onPress}
    >
      <View style={[styles.itemIcon, danger && styles.itemIconDanger]}>
        {icon}
      </View>
      <Text style={[styles.itemLabel, danger && styles.itemLabelDanger]}>
        {label}
      </Text>
    </Pressable>
  );
}

// ─── Main sidebar ─────────────────────────────────────────────────────────────
export default function Sidebar({ navigation }) {
  const { visible, closeSidebar } = useSidebar();
  const { signOut } = useAuth();
  const insets = useSafeAreaInsets();

  const translateX = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          damping: 22,
          stiffness: 180,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -SIDEBAR_WIDTH,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const go = (tabName, screenName) => {
    closeSidebar();
    if (!navigation.isReady()) return;

    if (screenName) {
      navigation.navigate(tabName, { screen: screenName });
    } else {
      navigation.navigate(tabName);
    }
  };

  const handleLogout = async () => {
    closeSidebar();
    await signOut();
  };

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {/* Dim overlay */}
      <TouchableWithoutFeedback onPress={closeSidebar}>
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
      </TouchableWithoutFeedback>

      {/* Sidebar panel */}
      <Animated.View
        style={[
          styles.panel,
          {
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 24,
            transform: [{ translateX }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient colors={[C.orange, "#D87F12"]} style={styles.avatar}>
            <Text style={styles.avatarText}>J</Text>
          </LinearGradient>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>Jahan</Text>
            <Text style={styles.email}>jahan@nomzy.app</Text>
          </View>
          <Pressable style={styles.closeBtn} onPress={closeSidebar}>
            <CloseIcon />
          </Pressable>
        </View>

        <View style={styles.divider} />

        {/* Nav items */}
        <View style={styles.items}>
          <SidebarItem
            icon={<HomeIcon />}
            label="Home"
            onPress={() => go("HomeTab")}
          />
          <SidebarItem
            icon={<SearchIcon />}
            label="Discover"
            onPress={() => go("Search")}
          />
          <SidebarItem
            icon={<OrderIcon />}
            label="My Orders"
            onPress={() => go("Orders")}
          />
          <SidebarItem
            icon={<SavedIcon />}
            label="Saved"
            onPress={() => go("Saved")}
          />
          <SidebarItem
            icon={<ProfileIcon />}
            label="Profile"
            onPress={() => go("Profile")}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.items}>
          <SidebarItem
            icon={<HelpIcon />}
            label="Help & Support"
            onPress={() => go("HomeTab", "Help")}
          />
          <SidebarItem
            icon={<LogoutIcon />}
            label="Logout"
            onPress={handleLogout}
            danger
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  panel: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: C.surface,
    borderRightWidth: 1,
    borderRightColor: C.border,
    shadowColor: "#000",
    shadowOffset: { width: 8, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 4,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.orange,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "800",
    color: C.white,
  },
  headerInfo: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "800",
    color: C.white,
    letterSpacing: 0.2,
  },
  email: {
    fontSize: 12,
    color: C.secondary,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 14,
  },
  items: {
    gap: 2,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 14,
  },
  itemPressed: {
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  itemIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  itemIconDanger: {
    backgroundColor: "rgba(255,77,109,0.1)",
    borderColor: "rgba(255,77,109,0.2)",
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: C.white,
    letterSpacing: 0.1,
  },
  itemLabelDanger: {
    color: "#FF4D6D",
  },
});
