import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Line, Path } from "react-native-svg";
import { useCart } from "../../context/CartContext";
import { C } from "../../data/homeData";

// ─── Inline icons ─────────────────────────────────────────────────────────────
function MenuIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round">
      <Line x1="3" y1="6"  x2="21" y2="6"  />
      <Line x1="3" y1="12" x2="21" y2="12" />
      <Line x1="3" y1="18" x2="15" y2="18" />
    </Svg>
  );
}

function PinIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill={C.orange}
      stroke={C.orange} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <Circle cx="12" cy="9" r="2.5" fill={C.bg} stroke={C.bg} />
    </Svg>
  );
}

function CartIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <Line x1="3" y1="6" x2="21" y2="6" />
      <Path d="M16 10a4 4 0 01-8 0" />
    </Svg>
  );
}

export default function HomeHeader({ navigation }) {
  const insets = useSafeAreaInsets();
  const { itemCount } = useCart();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      {/* Left — menu */}
      <Pressable
        style={styles.iconBtn}
        onPress={() => navigation.getParent()?.navigate("Profile")}
      >
        <MenuIcon />
      </Pressable>

      {/* Center — location */}
      <View style={styles.locationBlock}>
        <Text style={styles.locationLabel}>Current Location</Text>
        <View style={styles.locationRow}>
          <PinIcon />
          <Text style={styles.locationName} numberOfLines={1}>Connaught Place, Delhi</Text>
        </View>
      </View>

      {/* Right — cart */}
      <Pressable style={styles.iconBtn} onPress={() => navigation.navigate("Cart")}>
        <CartIcon />
        {itemCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{itemCount}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: C.bg,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: C.orange,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: C.white,
  },
  locationBlock: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  locationLabel: {
    fontSize: 11,
    color: C.secondary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationName: {
    fontSize: 14,
    fontWeight: "600",
    color: C.white,
    letterSpacing: 0.2,
  },
});
