import { useRef, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Line, Path } from "react-native-svg";
import { useCart } from "../../context/CartContext";
import { C, RESTAURANTS } from "../../data/discoveryData";
import ActionBar from "./ActionBar";
import SwipeCard from "./SwipeCard";

const { width } = Dimensions.get("window");

function FilterIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Line x1="4" y1="6" x2="20" y2="6" />
      <Line x1="8" y1="12" x2="16" y2="12" />
      <Line x1="11" y1="18" x2="13" y2="18" />
    </Svg>
  );
}

function CartIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <Line x1="3" y1="6" x2="21" y2="6" />
      <Path d="M16 10a4 4 0 01-8 0" />
    </Svg>
  );
}

function PinIcon() {
  return (
    <Svg width={13} height={13} viewBox="0 0 24 24"
      fill={C.orange} stroke={C.orange} strokeWidth={1}>
      <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <Circle cx="12" cy="9" r="2.5" fill={C.bg} stroke={C.bg} />
    </Svg>
  );
}

export default function DiscoveryScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [deck, setDeck] = useState(RESTAURANTS);
  const [saved, setSaved] = useState([]);
  const cardRefs = useRef({});
  const { itemCount } = useCart();

  const topRestaurant = deck[0];

  const handleSwipeLeft = () => {
    setDeck((prev) => prev.slice(1));
  };

  const handleSwipeRight = (restaurant) => {
    navigation.navigate("RestaurantDetail", { restaurant });
    // Rotate card to back of deck so browsing continues on return
    setDeck((prev) => [...prev.slice(1), prev[0]]);
  };

  const handleSwipeUp = (restaurant) => {
    navigation.navigate("RestaurantDetail", { restaurant });
    // Put the card back at the end so deck doesn't shrink
    setDeck((prev) => [...prev.slice(1), prev[0]]);
  };

  const handleFave = (id) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Action bar triggers
  const handlePass = () => handleSwipeLeft();
  const handleSave = () => {
    if (topRestaurant) handleSwipeRight(topRestaurant);
  };
  const handleViewMenu = () => {
    if (topRestaurant) handleSwipeUp(topRestaurant);
  };

  // Refill deck if exhausted
  if (deck.length === 0) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>You've seen it all</Text>
          <Text style={styles.emptySubtitle}>Check back later for new restaurants</Text>
          <Pressable style={styles.resetBtn} onPress={() => setDeck(RESTAURANTS)}>
            <Text style={styles.resetLabel}>Start Over</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // Render up to 3 cards in the deck (back to front)
  const visibleCards = deck.slice(0, 3).reverse();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Pressable style={styles.iconBtn}>
          <FilterIcon />
        </Pressable>

        <View style={styles.locationBlock}>
          <Text style={styles.locationLabel}>Current Location</Text>
          <View style={styles.locationRow}>
            <PinIcon />
            <Text style={styles.locationName}>Mumbai, India</Text>
          </View>
        </View>

        <Pressable style={styles.iconBtn} onPress={() => navigation.navigate("Cart")}>
          <CartIcon />
          {itemCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{itemCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* ── Card deck ── */}
      <View style={styles.deckArea}>
        {visibleCards.map((restaurant, reversedIdx) => {
          // reversedIdx 0 = back card, last = top card
          const index = visibleCards.length - 1 - reversedIdx;
          return (
            <SwipeCard
              key={restaurant.id}
              restaurant={restaurant}
              index={index}
              totalCards={visibleCards.length}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              onSwipeUp={handleSwipeUp}
              isFaved={saved.includes(restaurant.id)}
              onFave={handleFave}
            />
          );
        })}
      </View>

      {/* ── Action bar ── */}
      <View style={[styles.actionArea, { paddingBottom: insets.bottom + 8 }]}>
        <ActionBar
          onPass={handlePass}
          onViewMenu={handleViewMenu}
          onSave={handleSave}
        />
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
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
    fontSize: 10.5,
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

  // Deck
  deckArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // Action bar
  actionArea: {
    paddingTop: 12,
    alignItems: "center",
  },

  // Empty state
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.3,
  },
  emptySubtitle: {
    fontSize: 14,
    color: C.secondary,
    textAlign: "center",
    lineHeight: 20,
  },
  resetBtn: {
    marginTop: 8,
    backgroundColor: C.orange,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
  },
  resetLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.4,
  },
});
