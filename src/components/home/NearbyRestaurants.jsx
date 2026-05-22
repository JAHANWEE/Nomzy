import { useEffect, useRef } from "react";
import {
    Animated,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Svg, { Path, Polyline } from "react-native-svg";
import { C, NEARBY } from "../../data/homeData";
import { enrichRestaurant } from "../../data/restaurantUtils";
import SectionHeader from "./SectionHeader";

function StarIcon() {
  return (
    <Svg width={10} height={10} viewBox="0 0 24 24"
      fill={C.orange} stroke={C.orange} strokeWidth={1}>
      <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </Svg>
  );
}

function ClockIcon() {
  return (
    <Svg width={10} height={10} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round">
      <Path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
      <Polyline points="12 6 12 12 16 14" />
    </Svg>
  );
}

function ChevronIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none"
      stroke={C.secondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9 18l6-6-6-6" />
    </Svg>
  );
}

function NearbyRow({ item, index, navigation }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 450,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.spring(translateX, {
        toValue: 0,
        friction: 8,
        tension: 60,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.row, { opacity, transform: [{ translateX }] }]}>
      <Pressable
        style={styles.rowInner}
        onPress={() => navigation.navigate("RestaurantDetail", { restaurant: enrichRestaurant(item) })}
      >
        <Image source={{ uri: item.image }} style={styles.thumb} resizeMode="cover" />
        <View style={styles.rowInfo}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.cuisines} numberOfLines={1}>{item.cuisines}</Text>
          <View style={styles.meta}>
            <View style={styles.ratingPill}>
              <StarIcon />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <View style={styles.metaDot} />
            <ClockIcon />
            <Text style={styles.metaText}>{item.time}</Text>
            <View style={styles.metaDot} />
            <Text style={styles.metaText}>{item.distance}</Text>
          </View>
        </View>
        <ChevronIcon />
      </Pressable>
    </Animated.View>
  );
}

export default function NearbyRestaurants({ navigation }) {
  return (
    <View style={styles.root}>
      <SectionHeader title="Nearby Restaurants" />
      <View style={styles.list}>
        {NEARBY.map((item, i) => (
          <NearbyRow key={item.id} item={item} index={i} navigation={navigation} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
  list: {
    paddingHorizontal: 20,
    gap: 10,
  },
  row: {
    backgroundColor: C.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  rowInner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: C.surface,
  },
  rowInfo: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.1,
  },
  cuisines: {
    fontSize: 12,
    color: C.secondary,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "600",
    color: C.white,
  },
  metaText: {
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
});
