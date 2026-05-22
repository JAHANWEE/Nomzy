import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    Dimensions,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line, Path, Polyline } from "react-native-svg";
import { C, MENU_CATEGORIES } from "../../data/discoveryData";

const { width } = Dimensions.get("window");

function BackIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"
      stroke={C.white} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M19 12H5" />
      <Polyline points="12 19 5 12 12 5" />
    </Svg>
  );
}

function PlusIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none"
      stroke={C.white} strokeWidth={2.5} strokeLinecap="round">
      <Line x1="12" y1="5" x2="12" y2="19" />
      <Line x1="5" y1="12" x2="19" y2="12" />
    </Svg>
  );
}

function MenuItem({ dish }) {
  const [qty, setQty] = useState(0);

  return (
    <View style={styles.menuItem}>
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{dish.name}</Text>
        <Text style={styles.menuItemDesc} numberOfLines={2}>{dish.desc}</Text>
        <Text style={styles.menuItemPrice}>{dish.price}</Text>
      </View>

      <View style={styles.menuItemRight}>
        <Image source={{ uri: dish.image }} style={styles.menuItemImage} resizeMode="cover" />

        {qty === 0 ? (
          <Pressable style={styles.addBtn} onPress={() => setQty(1)}>
            <PlusIcon />
          </Pressable>
        ) : (
          <View style={styles.qtyControl}>
            <Pressable style={styles.qtyBtn} onPress={() => setQty((q) => Math.max(0, q - 1))}>
              <Text style={styles.qtyBtnText}>−</Text>
            </Pressable>
            <Text style={styles.qtyText}>{qty}</Text>
            <Pressable style={styles.qtyBtn} onPress={() => setQty((q) => q + 1)}>
              <Text style={styles.qtyBtnText}>+</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

export default function MenuScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState("Recommended");

  const totalItems = 0; // would be computed from cart state in a real app

  return (
    <View style={styles.root}>
      {/* ── Header ── */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <BackIcon />
        </Pressable>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{restaurant.name}</Text>
          <Text style={styles.headerCuisines}>{restaurant.cuisines}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* ── Category tabs ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryTabs}
        style={styles.categoryScroll}
      >
        {MENU_CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            style={[styles.catTab, activeCategory === cat && styles.catTabActive]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={[styles.catTabText, activeCategory === cat && styles.catTabTextActive]}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* ── Divider ── */}
      <View style={styles.divider} />

      {/* ── Menu items ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.menuList,
          { paddingBottom: 100 + insets.bottom },
        ]}
      >
        <Text style={styles.categoryHeading}>{activeCategory}</Text>
        {restaurant.menu.map((dish) => (
          <MenuItem key={dish.id} dish={dish} />
        ))}
      </ScrollView>

      {/* ── Cart CTA ── */}
      <View style={[styles.cartBar, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable style={styles.cartBtn}>
          <LinearGradient
            colors={[C.orange, C.orangeDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cartGradient}
          >
            <Text style={styles.cartLabel}>View Cart</Text>
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>2</Text>
            </View>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 14,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfo: {
    flex: 1,
    alignItems: "center",
  },
  headerName: {
    fontSize: 17,
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.2,
  },
  headerCuisines: {
    fontSize: 12,
    color: C.secondary,
    marginTop: 2,
  },

  // Category tabs
  categoryScroll: {
    flexGrow: 0,
  },
  categoryTabs: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 2,
  },
  catTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
  },
  catTabActive: {
    backgroundColor: "rgba(255,159,45,0.12)",
    borderColor: C.orange,
  },
  catTabText: {
    fontSize: 13,
    color: C.secondary,
    fontWeight: "500",
  },
  catTabTextActive: {
    color: C.orange,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: C.border,
    marginTop: 12,
    marginHorizontal: 20,
  },

  // Menu list
  menuList: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 0,
  },
  categoryHeading: {
    fontSize: 18,
    fontWeight: "700",
    color: C.white,
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    gap: 14,
  },
  menuItemInfo: {
    flex: 1,
    gap: 5,
  },
  menuItemName: {
    fontSize: 15,
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.1,
  },
  menuItemDesc: {
    fontSize: 12.5,
    color: C.secondary,
    lineHeight: 18,
  },
  menuItemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: C.orange,
    marginTop: 2,
  },
  menuItemRight: {
    alignItems: "center",
    gap: 8,
  },
  menuItemImage: {
    width: 90,
    height: 80,
    borderRadius: 14,
    backgroundColor: C.card,
  },
  addBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: C.orange,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.orange,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,159,45,0.3)",
    overflow: "hidden",
  },
  qtyBtn: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: {
    fontSize: 16,
    color: C.orange,
    fontWeight: "700",
  },
  qtyText: {
    fontSize: 13,
    fontWeight: "700",
    color: C.white,
    minWidth: 20,
    textAlign: "center",
  },

  // Cart bar
  cartBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: "rgba(18,13,10,0.95)",
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  cartBtn: {
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: C.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
  },
  cartGradient: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    gap: 10,
  },
  cartLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.4,
  },
  cartBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: C.white,
  },
});
