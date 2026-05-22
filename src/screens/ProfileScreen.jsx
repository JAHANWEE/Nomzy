import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Line, Path, Polyline } from "react-native-svg";
import SidebarButton from "../components/navigation/SidebarButton";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";
import { C } from "../data/homeData";

// ─── Icons ────────────────────────────────────────────────────────────────────
function ChevronIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9 18l6-6-6-6" />
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

function AddressIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <Circle cx="12" cy="9" r="2.5" />
    </Svg>
  );
}

function PaymentIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M2 7h20v14H2z" />
      <Path d="M2 11h20" />
      <Path d="M6 15h4" />
    </Svg>
  );
}

function NotifIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <Path d="M13.73 21a2 2 0 01-3.46 0" />
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

// ─── Stat pill ────────────────────────────────────────────────────────────────
function StatPill({ value, label }) {
  return (
    <View style={styles.statPill}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ─── Menu row ─────────────────────────────────────────────────────────────────
function MenuRow({ icon, label, value, onPress, danger, toggle, toggleValue, onToggle }) {
  return (
    <Pressable style={styles.menuRow} onPress={onPress}>
      <View style={[styles.menuIcon, danger && styles.menuIconDanger]}>
        {icon}
      </View>
      <Text style={[styles.menuLabel, danger && styles.menuLabelDanger]}>{label}</Text>
      <View style={styles.menuRight}>
        {value ? <Text style={styles.menuValue}>{value}</Text> : null}
        {toggle ? (
          <Switch
            value={toggleValue}
            onValueChange={onToggle}
            trackColor={{ false: C.surface, true: "rgba(255,159,45,0.4)" }}
            thumbColor={toggleValue ? C.orange : C.secondary}
          />
        ) : (
          <ChevronIcon />
        )}
      </View>
    </Pressable>
  );
}

function OrderRow({ order }) {
  const orderItems = Array.isArray(order.items)
    ? order.items.map((item) => `${item.qty} x ${item.name}`).join(", ")
    : order.items;
  const orderTotal = typeof order.total === "number" ? `Rs. ${order.total}` : order.total;

  return (
    <View style={styles.orderRow}>
      <View style={styles.orderLeft}>
        <Text style={styles.orderRestaurant}>
          {typeof order.restaurant === "string" ? order.restaurant : order.restaurant.name}
        </Text>
        <Text style={styles.orderItems} numberOfLines={1}>{orderItems}</Text>
        <Text style={styles.orderDate}>{order.createdLabel || order.date}</Text>
      </View>
      <View style={styles.orderRight}>
        <Text style={styles.orderTotal}>{orderTotal}</Text>
        <View style={styles.orderStatusPill}>
          <Text style={styles.orderStatusText}>{order.status}</Text>
        </View>
      </View>
    </View>
  );
}

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [notifEnabled, setNotifEnabled] = useState(true);
  const { orders } = useOrders();
  const { signOut } = useAuth();
  const recentOrders = orders.slice(0, 3);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Drawer open button */}
      <View style={styles.drawerRow}>
        <SidebarButton />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: 100 + insets.bottom }]}
      >
        {/* ── Avatar + name ── */}
        <View style={styles.avatarSection}>
          <LinearGradient
            colors={[C.orange, C.orangeDark]}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>J</Text>
          </LinearGradient>
          <Text style={styles.userName}>Jahan</Text>
          <Text style={styles.userEmail}>jahan@nomzy.app</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <StatPill value={`${orders.length}`} label="Orders" />
            <View style={styles.statDivider} />
            <StatPill value="8" label="Saved" />
            <View style={styles.statDivider} />
            <StatPill value="4.9" label="Rating" />
          </View>
        </View>

        {/* ── Recent orders ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <View style={styles.card}>
            {recentOrders.length > 0 ? (
              recentOrders.map((order, i) => (
                <View key={order.id}>
                  <OrderRow order={order} />
                  {i < recentOrders.length - 1 && <View style={styles.rowDivider} />}
                </View>
              ))
            ) : (
              <Text style={styles.noOrders}>Placed orders will appear here.</Text>
            )}
          </View>
        </View>

        {/* ── Account ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <MenuRow
              icon={<OrderIcon />}
              label="My Orders"
              onPress={() => navigation.getParent()?.navigate("Orders")}
            />
            <View style={styles.rowDivider} />
            <MenuRow icon={<AddressIcon />} label="Saved Addresses" value="2 saved" onPress={() => {}} />
            <View style={styles.rowDivider} />
            <MenuRow icon={<PaymentIcon />} label="Payment Methods" value="•••• 4242" onPress={() => {}} />
          </View>
        </View>

        {/* ── Preferences ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            <MenuRow
              icon={<NotifIcon />}
              label="Notifications"
              toggle
              toggleValue={notifEnabled}
              onToggle={setNotifEnabled}
            />
            <View style={styles.rowDivider} />
            <MenuRow
              icon={<HelpIcon />}
              label="Help & Support"
              onPress={() =>
                navigation.getParent()?.navigate("HomeTab", { screen: "Help" })
              }
            />
          </View>
        </View>

        {/* ── Logout ── */}
        <View style={styles.section}>
          <View style={styles.card}>
            <MenuRow
              icon={<LogoutIcon />}
              label="Sign Out"
              danger
              onPress={signOut}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const C_ORANGE_DARK = "#D87F12";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  drawerRow: {
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  drawerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  // Avatar
  avatarSection: {
    alignItems: "center",
    paddingVertical: 24,
    gap: 6,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    shadowColor: C.orange,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 10,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "800",
    color: C.white,
  },
  userName: {
    fontSize: 22,
    fontWeight: "800",
    color: C.white,
    letterSpacing: 0.3,
  },
  userEmail: {
    fontSize: 13,
    color: C.secondary,
    letterSpacing: 0.2,
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    backgroundColor: C.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 0,
    alignSelf: "stretch",
  },
  statPill: {
    flex: 1,
    alignItems: "center",
    gap: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: C.white,
    letterSpacing: 0.2,
  },
  statLabel: {
    fontSize: 11,
    color: C.secondary,
    fontWeight: "500",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: C.border,
  },

  // Sections
  section: {
    marginBottom: 20,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: C.secondary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    paddingLeft: 4,
  },
  card: {
    backgroundColor: C.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    overflow: "hidden",
  },
  rowDivider: {
    height: 1,
    backgroundColor: C.border,
    marginHorizontal: 16,
  },

  // Menu rows
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: C.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: C.border,
  },
  menuIconDanger: {
    backgroundColor: "rgba(255,77,109,0.1)",
    borderColor: "rgba(255,77,109,0.2)",
  },
  menuLabel: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: "500",
    color: C.white,
    letterSpacing: 0.1,
  },
  menuLabelDanger: {
    color: "#FF4D6D",
  },
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  menuValue: {
    fontSize: 12.5,
    color: C.secondary,
  },

  // Orders
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  noOrders: {
    color: C.secondary,
    fontSize: 13,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  orderLeft: {
    flex: 1,
    gap: 3,
  },
  orderRestaurant: {
    fontSize: 14,
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.1,
  },
  orderItems: {
    fontSize: 12,
    color: C.secondary,
  },
  orderDate: {
    fontSize: 11,
    color: C.secondary,
    opacity: 0.7,
    marginTop: 2,
  },
  orderRight: {
    alignItems: "flex-end",
    gap: 6,
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: "700",
    color: C.white,
  },
  orderStatusPill: {
    backgroundColor: "rgba(255,159,45,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,159,45,0.3)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  orderStatusText: {
    fontSize: 10,
    fontWeight: "600",
    color: C.orange,
    letterSpacing: 0.3,
  },
});
