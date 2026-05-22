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
import Svg, { Path, Polyline } from "react-native-svg";
import { C, MENU_CATEGORIES } from "../../data/discoveryData";

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

function DishPreviewCard({ dish }) {
  return (
    <View style={styles.dishCard}>
      <Image source={{ uri: dish.image }} style={styles.dishImage} resizeMode="cover" />
      <LinearGradient
        colors={["transparent", "rgba(18,13,10,0.95)"]}
        style={styles.dishGradient}
      />
      <View style={styles.dishInfo}>
        <Text style={styles.dishName}>{dish.name}</Text>
        <Text style={styles.dishDesc} numberOfLines={1}>{dish.desc}</Text>
        <Text style={styles.dishPrice}>{dish.price}</Text>
      </View>
    </View>
  );
}

export default function RestaurantDetail({ route, navigation }) {
  const { restaurant } = route.params;
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState("Recommended");

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

          {/* Back button */}
          <Pressable
            style={[styles.backBtn, { top: insets.top + 12 }]}
            onPress={() => navigation.goBack()}
          >
            <BackIcon />
          </Pressable>

          {/* Hero info */}
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
          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{restaurant.description}</Text>
          </View>

          {/* Menu preview */}
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

            {/* Dish cards */}
            <View style={styles.dishGrid}>
              {restaurant.menu.map((dish) => (
                <DishPreviewCard key={dish.id} dish={dish} />
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

        {/* Bottom padding for CTA */}
        <View style={{ height: 100 + insets.bottom }} />
      </ScrollView>

      {/* ── Sticky CTA ── */}
      <View style={[styles.ctaBar, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={styles.ctaBtn}
          onPress={() => navigation.navigate("Menu", { restaurant })}
        >
          <LinearGradient
            colors={[C.orange, C.orangeDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaLabel}>View Full Menu</Text>
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

  // Dish grid
  dishGrid: {
    gap: 12,
  },
  dishCard: {
    height: 140,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
  },
  dishImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  dishGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "65%",
  },
  dishInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
    gap: 2,
  },
  dishName: {
    fontSize: 15,
    fontWeight: "700",
    color: C.white,
  },
  dishDesc: {
    fontSize: 12,
    color: C.secondary,
  },
  dishPrice: {
    fontSize: 13,
    fontWeight: "600",
    color: C.orange,
    marginTop: 2,
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
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
  },
  ctaLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.4,
  },
});
