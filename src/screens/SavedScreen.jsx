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
import Svg, { Path } from "react-native-svg";
import SidebarButton from "../components/navigation/SidebarButton";
import { C } from "../data/homeData";

const { width } = Dimensions.get("window");

// ─── Mock saved restaurants ───────────────────────────────────────────────────
const SAVED_RESTAURANTS = [
  {
    id: "1",
    name: "Spice Route",
    cuisines: "North Indian • Mughlai",
    rating: "4.8",
    time: "25-30 min",
    distance: "2.3 km",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=80",
  },
  {
    id: "2",
    name: "Basil & Thyme",
    cuisines: "Italian • Continental",
    rating: "4.9",
    time: "20-25 min",
    distance: "1.8 km",
    image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=700&q=80",
  },
  {
    id: "3",
    name: "Seoul Kitchen",
    cuisines: "Korean • Asian",
    rating: "4.6",
    time: "35-45 min",
    distance: "4.2 km",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=700&q=80",
  },
  {
    id: "4",
    name: "Ember & Smoke",
    cuisines: "BBQ • Continental",
    rating: "4.7",
    time: "30-40 min",
    distance: "3.1 km",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=700&q=80",
  },
];

// ─── Mock saved dishes ────────────────────────────────────────────────────────
const SAVED_DISHES = [
  {
    id: "d1",
    name: "Truffle Pasta",
    restaurant: "Basil & Thyme",
    price: "₹549",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=80",
  },
  {
    id: "d2",
    name: "Butter Chicken",
    restaurant: "Spice Route",
    price: "₹349",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80",
  },
  {
    id: "d3",
    name: "Ribeye Steak",
    restaurant: "Ember & Smoke",
    price: "₹899",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80",
  },
  {
    id: "d4",
    name: "Korean BBQ Set",
    restaurant: "Seoul Kitchen",
    price: "₹699",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80",
  },
];

function StarIcon() {
  return (
    <Svg width={11} height={11} viewBox="0 0 24 24" fill={C.orange} stroke={C.orange} strokeWidth={1}>
      <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </Svg>
  );
}

function HeartFilledIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24"
      fill="#FF4D6D" stroke="#FF4D6D" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round">
      <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </Svg>
  );
}

function RestaurantCard({ item, onUnsave }) {
  return (
    <View style={styles.restCard}>
      <Image source={{ uri: item.image }} style={styles.restImage} resizeMode="cover" />
      <LinearGradient
        colors={["transparent", "rgba(18,13,10,0.96)"]}
        style={styles.restGradient}
      />
      <View style={styles.restInfo}>
        <Text style={styles.restName}>{item.name}</Text>
        <Text style={styles.restCuisines}>{item.cuisines}</Text>
        <View style={styles.restMeta}>
          <StarIcon />
          <Text style={styles.restMetaText}>{item.rating}</Text>
          <View style={styles.metaDot} />
          <Text style={styles.restMetaText}>{item.time}</Text>
          <View style={styles.metaDot} />
          <Text style={styles.restMetaText}>{item.distance}</Text>
        </View>
      </View>
      <Pressable style={styles.unsaveBtn} onPress={() => onUnsave(item.id)}>
        <HeartFilledIcon />
      </Pressable>
    </View>
  );
}

function DishChip({ item }) {
  return (
    <View style={styles.dishChip}>
      <Image source={{ uri: item.image }} style={styles.dishChipImage} resizeMode="cover" />
      <View style={styles.dishChipInfo}>
        <Text style={styles.dishChipName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.dishChipRest} numberOfLines={1}>{item.restaurant}</Text>
        <Text style={styles.dishChipPrice}>{item.price}</Text>
      </View>
    </View>
  );
}

const TABS = ["Restaurants", "Dishes"];

export default function SavedScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeSection, setActiveSection] = useState("Restaurants");
  const [saved, setSaved] = useState(SAVED_RESTAURANTS.map((r) => r.id));

  const handleUnsave = (id) => setSaved((prev) => prev.filter((x) => x !== id));
  const visibleRestaurants = SAVED_RESTAURANTS.filter((r) => saved.includes(r.id));

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>Saved</Text>
          <Text style={styles.headerSub}>Your curated collection</Text>
        </View>
        <SidebarButton />
      </View>

      {/* ── Section tabs ── */}
      <View style={styles.sectionTabs}>
        {TABS.map((t) => (
          <Pressable
            key={t}
            style={[styles.sectionTab, activeSection === t && styles.sectionTabActive]}
            onPress={() => setActiveSection(t)}
          >
            <Text style={[styles.sectionTabText, activeSection === t && styles.sectionTabTextActive]}>
              {t}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: 100 + insets.bottom }]}
      >
        {activeSection === "Restaurants" ? (
          visibleRestaurants.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>No saved restaurants</Text>
              <Text style={styles.emptySub}>Swipe right on restaurants you love</Text>
            </View>
          ) : (
            <View style={styles.restList}>
              {visibleRestaurants.map((item) => (
                <RestaurantCard key={item.id} item={item} onUnsave={handleUnsave} />
              ))}
            </View>
          )
        ) : (
          <View style={styles.dishGrid}>
            {SAVED_DISHES.map((item) => (
              <DishChip key={item.id} item={item} />
            ))}
          </View>
        )}
      </ScrollView>
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
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerCopy: {
    flex: 1,
    gap: 4,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: C.white,
    letterSpacing: 0.3,
  },
  headerSub: {
    fontSize: 13,
    color: C.secondary,
    letterSpacing: 0.2,
  },

  // Section tabs
  sectionTabs: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: C.surface,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: C.border,
  },
  sectionTab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: "center",
    borderRadius: 10,
  },
  sectionTabActive: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: "rgba(255,159,45,0.25)",
  },
  sectionTabText: {
    fontSize: 13,
    fontWeight: "500",
    color: C.secondary,
  },
  sectionTabTextActive: {
    color: C.orange,
    fontWeight: "700",
  },

  scroll: {
    paddingHorizontal: 20,
  },

  // Restaurant cards
  restList: {
    gap: 14,
  },
  restCard: {
    height: 180,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
  },
  restImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  restGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "65%",
  },
  restInfo: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 52,
    gap: 3,
  },
  restName: {
    fontSize: 18,
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.2,
  },
  restCuisines: {
    fontSize: 12,
    color: "rgba(255,255,255,0.65)",
  },
  restMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4,
  },
  restMetaText: {
    fontSize: 11,
    color: C.secondary,
  },
  metaDot: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: C.secondary,
    opacity: 0.5,
  },
  unsaveBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(18,13,10,0.65)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  // Dish chips
  dishGrid: {
    gap: 12,
  },
  dishChip: {
    flexDirection: "row",
    backgroundColor: C.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    overflow: "hidden",
    height: 80,
  },
  dishChipImage: {
    width: 80,
    height: "100%",
  },
  dishChipInfo: {
    flex: 1,
    padding: 14,
    justifyContent: "center",
    gap: 3,
  },
  dishChipName: {
    fontSize: 14,
    fontWeight: "700",
    color: C.white,
  },
  dishChipRest: {
    fontSize: 11.5,
    color: C.secondary,
  },
  dishChipPrice: {
    fontSize: 13,
    fontWeight: "600",
    color: C.orange,
    marginTop: 2,
  },

  // Empty
  empty: {
    paddingTop: 60,
    alignItems: "center",
    gap: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: C.white,
  },
  emptySub: {
    fontSize: 13,
    color: C.secondary,
    textAlign: "center",
  },
});
