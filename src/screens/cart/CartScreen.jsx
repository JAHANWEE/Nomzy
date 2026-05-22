import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Polyline } from "react-native-svg";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrdersContext";
import { C } from "../../data/discoveryData";

function BackIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"
      stroke={C.white} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M19 12H5" />
      <Polyline points="12 19 5 12 12 5" />
    </Svg>
  );
}

function parsePrice(value) {
  return parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
}

function CartLine({ dish, qty, onAdd, onRemove }) {
  return (
    <View style={styles.line}>
      <Image
        source={typeof dish.image === "string" ? { uri: dish.image } : dish.image}
        style={styles.lineImage}
        resizeMode="cover"
      />
      <View style={styles.lineInfo}>
        <Text style={styles.lineName} numberOfLines={1}>{dish.name}</Text>
        <Text style={styles.lineDesc} numberOfLines={1}>{dish.desc}</Text>
        <Text style={styles.linePrice}>{dish.price}</Text>
      </View>
      <View style={styles.qtyControl}>
        <Pressable style={styles.qtyBtn} onPress={onRemove}>
          <Text style={styles.qtyBtnText}>-</Text>
        </Pressable>
        <Text style={styles.qtyText}>{qty}</Text>
        <Pressable style={styles.qtyBtn} onPress={onAdd}>
          <Text style={styles.qtyBtnText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function CartScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { restaurant, cart, addItem, removeItem, clearCart } = useCart();
  const { addOrder } = useOrders();
  const items = restaurant?.menu.filter((dish) => cart[dish.id]) || [];
  const itemCount = items.reduce((sum, dish) => sum + cart[dish.id], 0);
  const subtotal = items.reduce(
    (sum, dish) => sum + parsePrice(dish.price) * cart[dish.id],
    0
  );
  const deliveryFee = subtotal > 0 ? 39 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const placeOrder = () => {
    const order = {
      id: `order-${Date.now()}`,
      restaurant,
      items: items.map((dish) => ({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        qty: cart[dish.id],
      })),
      itemCount,
      total,
      status: "Confirmed",
      createdLabel: "Just now",
    };

    addOrder(order);
    clearCart();
    navigation.navigate("OrderConfirmed", {
      order,
    });
  };

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <BackIcon />
        </Pressable>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Your Cart</Text>
          <Text style={styles.restaurant} numberOfLines={1}>
            {restaurant?.name || "No restaurant selected"}
          </Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>
            {restaurant
              ? `Add dishes from ${restaurant.name} to place an order.`
              : "Add dishes from a restaurant menu to place an order."}
          </Text>
          <Pressable
            style={styles.emptyBtn}
            onPress={() => {
              if (restaurant) {
                navigation.navigate("Menu", { restaurant });
                return;
              }

              navigation.getParent()?.navigate("Search");
            }}
          >
            <Text style={styles.emptyBtnText}>Browse Menu</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.content,
              { paddingBottom: 178 + insets.bottom },
            ]}
          >
            <View style={styles.summaryBand}>
              <Text style={styles.summaryLabel}>{itemCount} items selected</Text>
              <Text style={styles.summaryMeta}>{restaurant.time} delivery</Text>
            </View>

            <View style={styles.lines}>
              {items.map((dish) => (
                <CartLine
                  key={dish.id}
                  dish={dish}
                  qty={cart[dish.id]}
                  onAdd={() => addItem(restaurant, dish.id)}
                  onRemove={() => removeItem(restaurant, dish.id)}
                />
              ))}
            </View>

            <View style={styles.bill}>
              <Text style={styles.billTitle}>Bill Details</Text>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Item total</Text>
                <Text style={styles.billValue}>Rs. {subtotal}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery fee</Text>
                <Text style={styles.billValue}>Rs. {deliveryFee}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Taxes</Text>
                <Text style={styles.billValue}>Rs. {tax}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>To pay</Text>
                <Text style={styles.totalValue}>Rs. {total}</Text>
              </View>
            </View>
          </ScrollView>

          <View style={[styles.checkoutBar, { paddingBottom: insets.bottom + 12 }]}>
            <Pressable style={styles.checkoutBtn} onPress={placeOrder}>
              <LinearGradient
                colors={[C.orange, C.orangeDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.checkoutGradient}
              >
                <View>
                  <Text style={styles.checkoutLabel}>Place Order</Text>
                  <Text style={styles.checkoutMeta}>{itemCount} items</Text>
                </View>
                <Text style={styles.checkoutTotal}>Rs. {total}</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
  },
  headerInfo: {
    flex: 1,
    alignItems: "center",
  },
  headerSpacer: {
    width: 40,
  },
  title: {
    color: C.white,
    fontSize: 19,
    fontWeight: "700",
  },
  restaurant: {
    color: C.secondary,
    fontSize: 12,
    marginTop: 2,
  },
  content: {
    paddingHorizontal: 20,
    gap: 16,
  },
  summaryBand: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,159,45,0.24)",
    backgroundColor: "rgba(255,159,45,0.1)",
  },
  summaryLabel: {
    color: C.white,
    fontSize: 13,
    fontWeight: "600",
  },
  summaryMeta: {
    color: C.orange,
    fontSize: 12,
    fontWeight: "600",
  },
  lines: {
    gap: 10,
  },
  line: {
    minHeight: 92,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 18,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
  },
  lineImage: {
    width: 68,
    height: 68,
    borderRadius: 14,
    backgroundColor: C.surface,
  },
  lineInfo: {
    flex: 1,
    gap: 3,
  },
  lineName: {
    color: C.white,
    fontSize: 14,
    fontWeight: "700",
  },
  lineDesc: {
    color: C.secondary,
    fontSize: 11.5,
  },
  linePrice: {
    color: C.orange,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 3,
  },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: "rgba(255,159,45,0.28)",
  },
  qtyBtn: {
    width: 30,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: {
    color: C.orange,
    fontSize: 17,
    fontWeight: "700",
  },
  qtyText: {
    minWidth: 20,
    color: C.white,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "700",
  },
  bill: {
    gap: 12,
    padding: 16,
    borderRadius: 18,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
  },
  billTitle: {
    color: C.white,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  billLabel: {
    color: C.secondary,
    fontSize: 13,
  },
  billValue: {
    color: C.white,
    fontSize: 13,
    fontWeight: "600",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  totalLabel: {
    color: C.white,
    fontSize: 15,
    fontWeight: "700",
  },
  totalValue: {
    color: C.orange,
    fontSize: 16,
    fontWeight: "800",
  },
  checkoutBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: "rgba(18,13,10,0.96)",
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  checkoutBtn: {
    overflow: "hidden",
    borderRadius: 28,
  },
  checkoutGradient: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderRadius: 28,
  },
  checkoutLabel: {
    color: C.white,
    fontSize: 16,
    fontWeight: "700",
  },
  checkoutMeta: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 11.5,
    marginTop: 2,
  },
  checkoutTotal: {
    color: C.white,
    fontSize: 17,
    fontWeight: "800",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    color: C.white,
    fontSize: 22,
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
    borderRadius: 22,
    backgroundColor: C.orange,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emptyBtnText: {
    color: C.white,
    fontSize: 14,
    fontWeight: "700",
  },
});
