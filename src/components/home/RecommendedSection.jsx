import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { C, RECOMMENDED } from "../../data/homeData";
import { enrichRestaurant } from "../../data/restaurantUtils";
import SectionHeader from "./SectionHeader";

const { width } = Dimensions.get("window");
const CARD_W = (width - 40 - 12) / 2;

function StarIcon() {
  return (
    <Svg width={10} height={10} viewBox="0 0 24 24"
      fill={C.orange} stroke={C.orange} strokeWidth={1}>
      <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </Svg>
  );
}

function SmallCard({ item, index, navigation }) {
  const [liked, setLiked] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        tension: 60,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity, transform: [{ translateY }] }]}>
      <Pressable onPress={() => navigation.navigate("RestaurantDetail", { restaurant: enrichRestaurant(item) })}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
          <LinearGradient
            colors={["transparent", "rgba(18,13,10,0.9)"]}
            style={styles.gradient}
          />
          <View style={styles.ratingBadge}>
            <StarIcon />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.cuisines} numberOfLines={1}>{item.cuisines}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{item.time}</Text>
            <View style={styles.dot} />
            <Text style={styles.metaText}>{item.distance}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function RecommendedSection({ navigation }) {
  return (
    <View style={styles.root}>
      <SectionHeader title="Recommended For You" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {RECOMMENDED.map((item, i) => (
          <SmallCard key={item.id} item={item} index={i} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
  scroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  card: {
    width: CARD_W,
    backgroundColor: C.card,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: C.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  imageWrap: {
    width: "100%",
    height: 130,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "55%",
  },
  ratingBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(18,13,10,0.75)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,159,45,0.3)",
  },
  ratingText: {
    fontSize: 10,
    fontWeight: "700",
    color: C.white,
  },
  info: {
    padding: 10,
    gap: 3,
  },
  name: {
    fontSize: 13.5,
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.1,
  },
  cuisines: {
    fontSize: 11,
    color: C.secondary,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4,
  },
  metaText: {
    fontSize: 10.5,
    color: C.secondary,
  },
  dot: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: C.secondary,
    opacity: 0.5,
  },
});
