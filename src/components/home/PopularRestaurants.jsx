import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Svg, { Path, Polyline } from "react-native-svg";
import { C, POPULAR } from "../../data/homeData";
import { enrichRestaurant } from "../../data/restaurantUtils";
import SectionHeader from "./SectionHeader";

function StarIcon() {
  return (
    <Svg width={11} height={11} viewBox="0 0 24 24"
      fill={C.orange} stroke={C.orange} strokeWidth={1}>
      <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </Svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24"
      fill={filled ? "#FF4D6D" : "none"}
      stroke={filled ? "#FF4D6D" : "rgba(255,255,255,0.7)"}
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </Svg>
  );
}

function ClockIcon() {
  return (
    <Svg width={11} height={11} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round">
      <Path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
      <Polyline points="12 6 12 12 16 14" />
    </Svg>
  );
}

function PinSmallIcon() {
  return (
    <Svg width={11} height={11} viewBox="0 0 24 24"
      fill={C.secondary} stroke={C.secondary} strokeWidth={1}>
      <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    </Svg>
  );
}

function RestaurantCard({ item, index, navigation }) {
  const [liked, setLiked] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(30)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(translateX, {
        toValue: 0,
        friction: 8,
        tension: 55,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 40 }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40 }).start();

  return (
    <Animated.View style={[styles.card, { opacity, transform: [{ translateX }, { scale }] }]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => navigation.navigate("RestaurantDetail", { restaurant: enrichRestaurant(item) })}
      >
        {/* Image */}
        <View style={styles.imageWrap}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
          <LinearGradient
            colors={["transparent", "rgba(18,13,10,0.95)"]}
            style={styles.imageGradient}
          />

          {/* Rating badge */}
          <View style={styles.ratingBadge}>
            <StarIcon />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>

          {/* Heart */}
          <Pressable style={styles.heartBtn} onPress={() => setLiked(!liked)}>
            <HeartIcon filled={liked} />
          </Pressable>
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.cuisines} numberOfLines={1}>{item.cuisines}</Text>

          <View style={styles.meta}>
            <View style={styles.metaItem}>
              <ClockIcon />
              <Text style={styles.metaText}>{item.time}</Text>
            </View>
            <View style={styles.metaDot} />
            <View style={styles.metaItem}>
              <PinSmallIcon />
              <Text style={styles.metaText}>{item.distance}</Text>
            </View>
            <View style={styles.metaDot} />
            <Text style={styles.metaText}>{item.price}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function PopularRestaurants({ navigation }) {
  return (
    <View style={styles.root}>
      <SectionHeader title="Popular Restaurants" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {POPULAR.map((item, i) => (
          <RestaurantCard key={item.id} item={item} index={i} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
  scroll: {
    paddingHorizontal: 20,
    gap: 14,
  },
  card: {
    width: 260,
    backgroundColor: C.card,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: C.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  imageWrap: {
    width: "100%",
    height: 170,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
  },
  ratingBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(18,13,10,0.75)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,159,45,0.3)",
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "700",
    color: C.white,
  },
  heartBtn: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(18,13,10,0.65)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  info: {
    padding: 14,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.2,
  },
  cuisines: {
    fontSize: 12,
    color: C.secondary,
    letterSpacing: 0.2,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  metaText: {
    fontSize: 11,
    color: C.secondary,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: C.secondary,
    opacity: 0.5,
  },
});
