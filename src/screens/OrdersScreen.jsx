import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import BottomNav from "../components/navigation/BottomNav";
import { useOrders } from "../context/OrdersContext";
import { C } from "../data/homeData";

function BagIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"
      stroke={C.orange} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <Path d="M3 6h18M16 10a4 4 0 01-8 0" />
    </Svg>
  );
}

function OrderCard({ order }) {
  const dishSummary = order.items
    .map((item) => `${item.qty} x ${item.name}`)
    .join(", ");

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderTop}>
        <Image source={{ uri: order.restaurant.image }} style={styles.restaurantImage} />
        <View style={styles.orderInfo}>
          <Text style={styles.restaurantName} numberOfLines={1}>{order.restaurant.name}</Text>
          <Text style={styles.itemSummary} numberOfLines={2}>{dishSummary}</Text>
        </View>
        <Text style={styles.orderTotal}>Rs. {order.total}</Text>
      </View>

      <View style={styles.orderMeta}>
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
        <Text style={styles.etaText}>ETA {order.restaurant.time}</Text>
        <Text style={styles.dateText}>{order.createdLabel}</Text>
      </View>
    </View>
  );
}

export default function OrdersScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState("orders");

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (tab === "home") navigation.navigate("Home");
    if (tab === "search") navigation.navigate("Discovery");
    if (tab === "saved") navigation.navigate("Saved");
    if (tab === "profile") navigation.navigate("Profile");
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Orders</Text>
        <Text style={styles.subtitle}>Orders placed from your cart appear here.</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: 104 + insets.bottom }]}
      >
        {orders.length === 0 ? (
          <View style={styles.empty}>
            <LinearGradient
              colors={["rgba(255,159,45,0.16)", "rgba(255,159,45,0.04)"]}
              style={styles.emptyIcon}
            >
              <BagIcon />
            </LinearGradient>
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptyText}>Place an order from a restaurant menu to track it here.</Text>
            <Pressable style={styles.emptyBtn} onPress={() => navigation.navigate("Discovery")}>
              <Text style={styles.emptyBtnText}>Find Food</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.orderList}>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </View>
        )}
      </ScrollView>

      <BottomNav activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  header: {
    gap: 4,
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  title: {
    color: C.white,
    fontSize: 30,
    fontWeight: "800",
  },
  subtitle: {
    color: C.secondary,
    fontSize: 13,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  orderList: {
    gap: 12,
  },
  orderCard: {
    gap: 14,
    padding: 14,
    borderRadius: 20,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
  },
  orderTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  restaurantImage: {
    width: 62,
    height: 62,
    borderRadius: 14,
    backgroundColor: C.surface,
  },
  orderInfo: {
    flex: 1,
    gap: 4,
  },
  restaurantName: {
    color: C.white,
    fontSize: 15,
    fontWeight: "700",
  },
  itemSummary: {
    color: C.secondary,
    fontSize: 12,
    lineHeight: 17,
  },
  orderTotal: {
    color: C.orange,
    fontSize: 14,
    fontWeight: "800",
  },
  orderMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  statusPill: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,159,45,0.3)",
    backgroundColor: "rgba(255,159,45,0.12)",
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  statusText: {
    color: C.orange,
    fontSize: 10,
    fontWeight: "700",
  },
  etaText: {
    flex: 1,
    color: C.white,
    fontSize: 11.5,
    fontWeight: "600",
  },
  dateText: {
    color: C.secondary,
    fontSize: 11,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 28,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,159,45,0.22)",
    marginBottom: 8,
  },
  emptyTitle: {
    color: C.white,
    fontSize: 21,
    fontWeight: "700",
  },
  emptyText: {
    color: C.secondary,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  emptyBtn: {
    marginTop: 8,
    backgroundColor: C.orange,
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emptyBtnText: {
    color: C.white,
    fontSize: 14,
    fontWeight: "700",
  },
});
