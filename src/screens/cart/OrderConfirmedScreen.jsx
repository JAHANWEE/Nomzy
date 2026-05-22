import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Polyline } from "react-native-svg";
import { C } from "../../data/discoveryData";

function CheckIcon() {
  return (
    <Svg width={46} height={46} viewBox="0 0 24 24" fill="none"
      stroke={C.white} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M20 6L9 17l-5-5" />
    </Svg>
  );
}

function ClockIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none"
      stroke={C.orange} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
      <Polyline points="12 6 12 12 16 14" />
    </Svg>
  );
}

export default function OrderConfirmedScreen({ route, navigation }) {
  const { order } = route.params;
  const { restaurant } = order;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 28, paddingBottom: insets.bottom + 20 }]}>
      <View style={styles.hero}>
        <LinearGradient
          colors={[C.orange, C.orangeDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.checkWrap}
        >
          <CheckIcon />
        </LinearGradient>

        <Text style={styles.title}>Order Confirmed</Text>
        <Text style={styles.subtitle}>
          {restaurant.name} has received your order and will start preparing it now.
        </Text>
      </View>

      <View style={styles.receipt}>
        <View style={styles.eta}>
          <ClockIcon />
          <Text style={styles.etaText}>Arriving in {restaurant.time}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Restaurant</Text>
          <Text style={styles.value} numberOfLines={1}>{restaurant.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Items</Text>
          <Text style={styles.value}>{order.itemCount}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Paid</Text>
          <Text style={styles.totalValue}>Rs. {order.total}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.ordersBtn} onPress={() => navigation.navigate("Orders")}>
          <Text style={styles.ordersBtnText}>View Orders</Text>
        </Pressable>
        <Pressable style={styles.homeBtn} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: C.bg,
  },
  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  checkWrap: {
    width: 104,
    height: 104,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 52,
    shadowColor: C.orange,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.34,
    shadowRadius: 22,
    elevation: 8,
  },
  title: {
    color: C.white,
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 24,
  },
  subtitle: {
    maxWidth: 330,
    color: C.secondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 10,
  },
  receipt: {
    gap: 14,
    padding: 18,
    borderRadius: 22,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
  },
  eta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: "rgba(255,159,45,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,159,45,0.24)",
  },
  etaText: {
    color: C.white,
    fontSize: 13,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  label: {
    color: C.secondary,
    fontSize: 13,
  },
  value: {
    flexShrink: 1,
    color: C.white,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "right",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  totalLabel: {
    color: C.white,
    fontSize: 16,
    fontWeight: "700",
  },
  totalValue: {
    color: C.orange,
    fontSize: 18,
    fontWeight: "800",
  },
  homeBtn: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
  },
  homeBtnText: {
    color: C.white,
    fontSize: 16,
    fontWeight: "700",
  },
  actions: {
    gap: 10,
    marginTop: 16,
  },
  ordersBtn: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    backgroundColor: C.orange,
  },
  ordersBtnText: {
    color: C.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
