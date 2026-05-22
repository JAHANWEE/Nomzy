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
import { C, FEATURED } from "../../data/homeData";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 40;
const CARD_HEIGHT = 230;

function BannerCard({ item, index }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        delay: index * 120,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        tension: 60,
        delay: index * 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity, transform: [{ translateY }] }]}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <LinearGradient
        colors={["transparent", "rgba(18,13,10,0.6)", "rgba(18,13,10,0.97)"]}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Pressable style={styles.ctaBtn}>
          <LinearGradient
            colors={[C.orange, C.orangeDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaLabel}>{item.cta}</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </Animated.View>
  );
}

export default function FeaturedBanner() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = (e) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
    setActive(idx);
  };

  return (
    <View style={styles.root}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + 0}
        contentContainerStyle={styles.scrollContent}
      >
        {FEATURED.map((item, i) => (
          <BannerCard key={item.id} item={item} index={i} />
        ))}
      </ScrollView>

      {/* Dot indicators */}
      <View style={styles.dots}>
        {FEATURED.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === active ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 20,
  },
  scrollContent: {
    gap: 0,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: C.card,
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
    height: "75%",
  },
  content: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.72)",
    marginBottom: 14,
    lineHeight: 18,
  },
  ctaBtn: {
    alignSelf: "flex-start",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: C.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  ctaGradient: {
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 20,
  },
  ctaLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.4,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
  dotActive: {
    width: 20,
    backgroundColor: C.orange,
  },
  dotInactive: {
    width: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
});
