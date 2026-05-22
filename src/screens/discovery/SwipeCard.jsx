import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { C } from "../../data/discoveryData";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width - 32;
const CARD_HEIGHT = height * 0.74;
const SWIPE_THRESHOLD = width * 0.3;
const SWIPE_UP_THRESHOLD = height * 0.18;

function StarIcon({ size = 11, color = C.orange }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth={1}>
      <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </Svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24"
      fill={filled ? "#FF4D6D" : "none"}
      stroke={filled ? "#FF4D6D" : "rgba(255,255,255,0.8)"}
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </Svg>
  );
}

function ClockIcon() {
  return (
    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round">
      <Path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
      <Path d="M12 6v6l4 2" />
    </Svg>
  );
}

function PinIcon() {
  return (
    <Svg width={12} height={12} viewBox="0 0 24 24"
      fill={C.secondary} stroke={C.secondary} strokeWidth={1}>
      <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    </Svg>
  );
}

export default function SwipeCard({
  restaurant,
  index,        // 0 = top card, 1 = second, 2 = third
  totalCards,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  isFaved,
  onFave,
}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(index === 0 ? 1 : 1 - index * 0.04);
  const cardY = useSharedValue(index * 14);

  // When this card becomes the top card, spring it into position
  useEffect(() => {
    scale.value = withSpring(index === 0 ? 1 : 1 - index * 0.04, { damping: 18, stiffness: 120 });
    cardY.value = withSpring(index * 14, { damping: 18, stiffness: 120 });
  }, [index]);

  const gesture = Gesture.Pan()
    .enabled(index === 0)
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      const vx = e.velocityX;
      const vy = e.velocityY;
      const dx = e.translationX;
      const dy = e.translationY;

      // Determine dominant axis — whichever direction moved more wins
      const isHorizontal = Math.abs(dx) > Math.abs(dy);

      // Horizontal gestures take priority over vertical
      if (isHorizontal) {
        // Swipe right — save
        if (dx > SWIPE_THRESHOLD || vx > 800) {
          translateX.value = withTiming(width * 1.4, { duration: 280 }, () => {
            runOnJS(onSwipeRight)(restaurant);
          });
          return;
        }
        // Swipe left — pass
        if (dx < -SWIPE_THRESHOLD || vx < -800) {
          translateX.value = withTiming(-width * 1.4, { duration: 280 }, () => {
            runOnJS(onSwipeLeft)(restaurant);
          });
          return;
        }
      } else {
        // Swipe up — open restaurant
        if (dy < -SWIPE_UP_THRESHOLD || vy < -800) {
          translateY.value = withTiming(-height, { duration: 320 }, () => {
            runOnJS(onSwipeUp)(restaurant);
          });
          return;
        }
      }

      // Snap back
      translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
      translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
    });

  const animStyle = useAnimatedStyle(() => {
    const rotate = interpolate(translateX.value, [-width, 0, width], [-12, 0, 12]);
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value + cardY.value },
        { rotate: `${rotate}deg` },
        { scale: scale.value },
      ],
    };
  });

  // Tint overlays that appear while dragging
  const likeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD * 0.6], [0, 1], "clamp"),
  }));
  const passOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-SWIPE_THRESHOLD * 0.6, 0], [1, 0], "clamp"),
  }));

  const isTop = index === 0;

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.card, animStyle, { zIndex: totalCards - index }]}>
        {/* Restaurant image */}
        <Image
          source={{ uri: restaurant.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Dark gradient overlay */}
        <LinearGradient
          colors={["transparent", "rgba(12,8,5,0.55)", "rgba(12,8,5,0.97)"]}
          locations={[0.35, 0.65, 1]}
          style={styles.gradient}
        />

        {/* Swipe hint overlays — only on top card */}
        {isTop && (
          <>
            <Animated.View style={[styles.likeOverlay, likeOpacity]}>
              <Text style={styles.likeLabel}>MENU</Text>
            </Animated.View>
            <Animated.View style={[styles.passOverlay, passOpacity]}>
              <Text style={styles.passLabel}>PASS</Text>
            </Animated.View>
          </>
        )}

        {/* Top badges — only render on top card for perf */}
        {isTop && (
          <>
            <View style={styles.ratingBadge}>
              <StarIcon />
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
            </View>
            <Pressable style={styles.heartBtn} onPress={() => onFave(restaurant.id)}>
              <HeartIcon filled={isFaved} />
            </Pressable>
          </>
        )}

        {/* Bottom info panel */}
        {isTop && (
          <View style={styles.infoPanel}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.tagline}>{restaurant.tagline}</Text>

            {/* Meta row */}
            <View style={styles.metaRow}>
              <StarIcon size={10} />
              <Text style={styles.metaText}>{restaurant.rating}</Text>
              <View style={styles.metaDot} />
              <ClockIcon />
              <Text style={styles.metaText}>{restaurant.time}</Text>
              <View style={styles.metaDot} />
              <PinIcon />
              <Text style={styles.metaText}>{restaurant.distance}</Text>
              <View style={styles.metaDot} />
              <Text style={styles.metaText}>{restaurant.price}</Text>
            </View>

            {/* Signature dishes */}
            <View style={styles.dishes}>
              {restaurant.dishes.map((d) => (
                <View key={d} style={styles.dishChip}>
                  <Text style={styles.dishText}>{d}</Text>
                </View>
              ))}
            </View>

            {/* Swipe hint */}
            <Text style={styles.swipeHint}>← Pass  ↑ Details  → Menu</Text>
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 32,
    overflow: "hidden",
    backgroundColor: C.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 16,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
  },

  // Swipe overlays
  likeOverlay: {
    position: "absolute",
    top: 40,
    left: 24,
    borderWidth: 2,
    borderColor: C.orange,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    transform: [{ rotate: "-12deg" }],
  },
  likeLabel: {
    fontSize: 22,
    fontWeight: "800",
    color: C.orange,
    letterSpacing: 2,
  },
  passOverlay: {
    position: "absolute",
    top: 40,
    right: 24,
    borderWidth: 2,
    borderColor: "#FF4D6D",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    transform: [{ rotate: "12deg" }],
  },
  passLabel: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FF4D6D",
    letterSpacing: 2,
  },

  // Badges
  ratingBadge: {
    position: "absolute",
    top: 20,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(18,13,10,0.78)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,159,45,0.35)",
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
    color: C.white,
  },
  heartBtn: {
    position: "absolute",
    top: 16,
    right: 18,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(18,13,10,0.65)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  // Info panel
  infoPanel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 28,
    gap: 8,
  },
  name: {
    fontSize: 30,
    fontWeight: "800",
    color: C.white,
    letterSpacing: 0.3,
  },
  tagline: {
    fontSize: 13.5,
    color: "rgba(255,255,255,0.65)",
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  metaText: {
    fontSize: 12,
    color: C.secondary,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: C.secondary,
    opacity: 0.5,
  },
  dishes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  dishChip: {
    backgroundColor: "rgba(36,26,21,0.9)",
    borderWidth: 1,
    borderColor: "rgba(255,159,45,0.3)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  dishText: {
    fontSize: 11.5,
    color: C.secondary,
    fontWeight: "500",
  },
  swipeHint: {
    fontSize: 11,
    color: "rgba(255,255,255,0.3)",
    textAlign: "center",
    marginTop: 6,
    letterSpacing: 0.5,
  },
});
