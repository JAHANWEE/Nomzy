import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path, Polyline, Rect } from "react-native-svg";
import { C } from "../../data/homeData";

// ─── Tab icons ────────────────────────────────────────────────────────────────
function HomeIcon({ color }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <Polyline points="9 22 9 12 15 12 15 22" />
    </Svg>
  );
}

function SearchIcon({ color }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="11" cy="11" r="8" />
      <Path d="M21 21l-4.35-4.35" />
    </Svg>
  );
}

function OrdersIcon({ color }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <Rect x="9" y="3" width="6" height="4" rx="2" />
      <Path d="M9 12h6M9 16h4" />
    </Svg>
  );
}

function HeartIcon({ color }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </Svg>
  );
}

function ProfileIcon({ color }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <Circle cx="12" cy="7" r="4" />
    </Svg>
  );
}

const ICONS = {
  HomeTab: HomeIcon,
  Search: SearchIcon,
  Orders: OrdersIcon,
  Saved: HeartIcon,
  Profile: ProfileIcon,
};

function TabItem({ label, Icon, active, badge, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const color = active ? C.orange : C.secondary;

  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.88, useNativeDriver: true, speed: 50 }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();

  return (
    <Pressable
      style={styles.tab}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.tabInner, { transform: [{ scale }] }]}>
        {active && <View style={styles.activeGlow} />}
        <Icon color={color} />
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
        <Text style={[styles.tabLabel, { color }]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

export function TabIcon({ name, color }) {
  const Icon = ICONS[name] || HomeIcon;
  return <Icon color={color} />;
}

function routeHasNestedScreen(route) {
  let state = route.state;

  while (state) {
    const activeIndex = state.index || 0;
    if (activeIndex > 0) return true;

    state = state.routes?.[activeIndex]?.state;
  }

  return false;
}

export default function BottomNav({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const activeRoute = state.routes[state.index];

  if (routeHasNestedScreen(activeRoute)) {
    return null;
  }

  return (
    <View style={[styles.wrapper, { bottom: insets.bottom + 12 }]}>
      <View style={styles.pill}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title || route.name;
          const Icon = ICONS[route.name] || HomeIcon;
          const active = state.index === index;

          return (
            <TabItem
              key={route.key}
              label={label}
              Icon={Icon}
              active={active}
              badge={options.tabBarBadge}
              onPress={() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!active && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 20,
    right: 20,
    alignItems: "center",
  },
  pill: {
    flexDirection: "row",
    backgroundColor: "rgba(27,20,16,0.96)",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
    paddingHorizontal: 8,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 16,
    width: "100%",
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  tabInner: {
    alignItems: "center",
    gap: 3,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 20,
    overflow: "hidden",
  },
  activeGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: "rgba(255,159,45,0.12)",
  },
  tabLabel: {
    fontSize: 9.5,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 1,
    minWidth: 14,
    height: 14,
    borderRadius: 7,
    paddingHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.orange,
  },
  badgeText: {
    color: C.white,
    fontSize: 8,
    fontWeight: "700",
  },
});
