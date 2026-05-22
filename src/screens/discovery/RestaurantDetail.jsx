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
import { useCart } from "../../context/CartContext";
import { C, MENU_CATEGORIES, RESTAURANTS } from "../../data/discoveryData";

const { width, height } = Dimensions.get("window");
const HERO_HEIGHT = height * 0.46;

function BackIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"
      stroke={C.white} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M19 12H5" />
      <Polyline points="12 19 5 12 12 5" />
    </Svg>
  );
}

function StarIcon() {
  return (
    <Svg width={13} height={13} viewBox="0 0 24 24" fill={C.orange} stroke={C.orange} strokeWidth={1}>
      <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </Svg>
  );
}

function ClockIcon() {
  return (
    <Svg width={13} height={13} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round">
      <Path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
      <Path d="M12 6v6l4 2" />
    </Svg>
  );
}

function PinIcon() {
  return (
    <Svg width={13} height={13} viewBox="0 0 24 24"
      fill={C.secondary} stroke={C.secondary} strokeWidth={1}>
      <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    </Svg>
  );
}

function PlusIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none"
      stroke={C.white} strokeWidth={2.5} strokeLinecap="round">
      <Line x1="12" y1="5" x2="12" y2="19" />
      <Line x1="5" y1="12" x2="19" y2="12" />
    </Svg>
  );
}

function ReviewCard({ review }) {
  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewAvatar}>
          <Text style={styles.reviewAvatarText}>{review.name[0]}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.reviewName}>{review.name}</Text>
          <View style={styles.reviewRating}>
            <StarIcon />
            <Text style={styles.reviewRatingText}>{review.rating}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  );
}

// ─── Menu item card with add/remove qty controls ──────────────────────────────
function MenuItemCard({ dish, qty, onAdd, onRemove }) {
  return (
    <View style={styles.menuItem}>
      {/* Left: info */}
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{dish.name}</Text>
        <Text style={styles.menuItemDesc} numberOfLines={2}>{dish.desc}</Text>
        <Text style={styles.menuItemPrice}>{dish.price}</Text>
      </View>

      {/* Right: image with + overlaid on bottom-right corner */}
      <View style={styles.menuItemRight}>
        <View style={styles.menuItemImageWrap}>
          <Image
            source={typeof dish.image === "string" ? { uri: dish.image } : dish.image}
            style={styles.menuItemImage}
            resizeMode="cover"
          />
          {qty === 0 ? (
            <Pressable style={styles.addBtn} onPress={onAdd}>
              <PlusIcon />
            </Pressable>
          ) : (
            <View style={styles.qtyControl}>
              <Pressable style={styles.qtyBtn} onPress={onRemove}>
                <Text style={styles.qtyBtnText}>−</Text>
              </Pressable>
              <Text style={styles.qtyText}>{qty}</Text>
              <Pressable style={styles.qtyBtn} onPress={onAdd}>
                <Text style={styles.qtyBtnText}>+</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default function RestaurantDetail({ route, navigation }) {
  const restaurant =
    route.params?.restaurant ||
    RESTAURANTS.find((item) => item.id === route.params?.id);
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState("Recommended");
  const {
    restaurant: cartRestaurant,
    cart: activeCart,
    addItem,
    removeItem,
  } = useCart();
  const cart = restaurant && cartRestaurant?.id === restaurant.id ? activeCart : {};

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  // Parse price string like "₹349" → 349
  const parsePrice = (str) => parseInt(str.replace(/[^\d]/g, ""), 10) || 0;

  const cartTotal = restaurant?.menu.reduce((sum, dish) => {
    return sum + parsePrice(dish.price) * (cart[dish.id] || 0);
  }, 0) || 0;

  if (!restaurant) {
    return (
      <View style={[styles.root, styles.missing]}>
        <Text style={styles.missingTitle}>Restaurant not found</Text>
        <Pressable style={styles.missingBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.missingBtnText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* ── Hero ── */}
        <View style={styles.heroWrap}>
          <Image source={{ uri: restaurant.image }} style={styles.hero} resizeMode="cover" />
          <LinearGradient
            colors={["rgba(18,13,10,0.3)", "transparent", "rgba(18,13,10,0.85)", C.bg]}
            locations={[0, 0.3, 0.75, 1]}
            style={styles.heroGradient}
          />

          <Pressable
            style={[styles.backBtn, { top: insets.top + 12 }]}
            onPress={() => navigation.goBack()}
          >
            <BackIcon />
          </Pressable>

          <View style={styles.heroInfo}>
            <Text style={styles.heroName}>{restaurant.name}</Text>
            <Text style={styles.heroCuisines}>{restaurant.cuisines}</Text>
            <View style={styles.heroMeta}>
              <StarIcon />
              <Text style={styles.heroMetaText}>{restaurant.rating}</Text>
              <View style={styles.metaDot} />
              <ClockIcon />
              <Text style={styles.heroMetaText}>{restaurant.time}</Text>
              <View style={styles.metaDot} />
              <PinIcon />
              <Text style={styles.heroMetaText}>{restaurant.distance}</Text>
              <View style={styles.metaDot} />
              <Text style={styles.heroMetaText}>{restaurant.price}</Text>
            </View>
          </View>
        </View>

        {/* ── Body ── */}
        <View style={styles.body}>
          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{restaurant.description}</Text>
          </View>

          {/* Menu */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Dishes</Text>

            {/* Category tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryTabs}
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

            {/* Menu item cards — first 4 only */}
            <View style={styles.menuList}>
              {restaurant.menu.slice(0, 4).map((dish) => (
                <MenuItemCard
                  key={dish.id}
                  dish={dish}
                  qty={cart[dish.id] || 0}
                  onAdd={() => addItem(restaurant, dish.id)}
                  onRemove={() => removeItem(restaurant, dish.id)}
                />
              ))}
            </View>
          </View>

          {/* Reviews */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <View style={styles.reviewList}>
              {restaurant.reviews.map((r, i) => (
                <ReviewCard key={i} review={r} />
              ))}
            </View>
          </View>
        </View>

        <View style={{ height: 110 + insets.bottom }} />
      </ScrollView>

      {/* ── Sticky CTA — shows cart summary when items added ── */}
      <View style={[styles.ctaBar, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={styles.ctaBtn}
          onPress={() =>
            navigation.navigate(cartCount > 0 ? "Cart" : "Menu", { restaurant })
          }
        >
          <LinearGradient
            colors={[C.orange, C.orangeDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            {cartCount > 0 ? (
              <>
                <View style={styles.ctaBadge}>
                  <Text style={styles.ctaBadgeText}>{cartCount}</Text>
                </View>
                <Text style={styles.ctaLabel}>View Cart</Text>
                <Text style={styles.ctaPrice}>₹{cartTotal}</Text>
              </>
            ) : (
              <Text style={styles.ctaLabel}>View Full Menu</Text>
            )}
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
  missing: {
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    paddingHorizontal: 24,
  },
  missingTitle: {
    color: C.white,
    fontSize: 22,
    fontWeight: "700",
  },
  missingBtn: {
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 12,
    backgroundColor: C.orange,
  },
  missingBtnText: {
    color: C.white,
    fontSize: 14,
    fontWeight: "700",
  },

  // Hero
  heroWrap: {
    width,
    height: HERO_HEIGHT,
  },
  hero: {
    width: "100%",
    height: "100%",
  },
  heroGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backBtn: {
    position: "absolute",
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(18,13,10,0.65)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: C.border,
  },
  heroInfo: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    gap: 6,
  },
  heroName: {
    fontSize: 32,
    fontWeight: "800",
    color: C.white,
    letterSpacing: 0.3,
  },
  heroCuisines: {
    fontSize: 14,
    color: C.secondary,
    letterSpacing: 0.2,
  },
  heroMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
    marginTop: 2,
  },
  heroMetaText: {
    fontSize: 12.5,
    color: C.secondary,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: C.secondary,
    opacity: 0.5,
  },

  // Body
  body: {
    paddingHorizontal: 20,
    paddingTop: 8,
    gap: 28,
  },
  section: {
    gap: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 14,
    color: C.secondary,
    lineHeight: 22,
    letterSpacing: 0.2,
  },

  // Reviews
  reviewList: {
    gap: 12,
  },
  reviewCard: {
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: C.border,
    gap: 10,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: "rgba(255,159,45,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewAvatarText: {
    fontSize: 15,
    fontWeight: "700",
    color: C.orange,
  },
  reviewName: {
    fontSize: 13.5,
    fontWeight: "600",
    color: C.white,
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  reviewRatingText: {
    fontSize: 11.5,
    color: C.secondary,
    fontWeight: "500",
  },
  reviewText: {
    fontSize: 13.5,
    color: C.secondary,
    lineHeight: 20,
    letterSpacing: 0.1,
  },

  // Category tabs
  categoryTabs: {
    gap: 8,
    paddingBottom: 4,
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

  // Menu items
  menuList: {
    gap: 0,
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
  },
  menuItemImageWrap: {
    width: 90,
    height: 80,
    position: "relative",
  },
  menuItemImage: {
    width: 90,
    height: 80,
    borderRadius: 14,
    backgroundColor: C.card,
  },
  addBtn: {
    position: "absolute",
    bottom: -10,
    right: -10,
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
    position: "absolute",
    bottom: -14,
    right: -14,
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

  // CTA
  ctaBar: {
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
  ctaBtn: {
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: C.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
  },
  ctaGradient: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    gap: 10,
    paddingHorizontal: 20,
  },
  ctaLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.4,
    flex: 1,
    textAlign: "center",
  },
  ctaBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: C.white,
  },
  ctaPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(255,255,255,0.85)",
  },
});
