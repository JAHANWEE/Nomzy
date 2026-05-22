import { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    View
} from "react-native";

const { width, height } = Dimensions.get("window");

const SPLASH_BG = require("../../assets/nomz/splash_screen.jpeg");

/**
 * In-app splash screen shown while the native splash transitions out.
 * Fades in the logo + tagline, then calls `onFinish` when done.
 *
 * @param {{ onFinish: () => void }} props
 */
export default function SplashScreen({ onFinish }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Fade + scale in the logo
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
      ]),
      // 2. Fade in the tagline
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 500,
        delay: 100,
        useNativeDriver: true,
      }),
      // 3. Hold for a moment
      Animated.delay(900),
      // 4. Fade the whole screen out
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish?.();
    });
  }, []);

  return (
    <Animated.View style={[styles.root, { opacity: screenOpacity }]}>
      {/* Full-screen background */}
      <Image source={SPLASH_BG} style={styles.bg} resizeMode="cover" />

      {/* Dark overlay so text stays readable regardless of image content */}
      <View style={styles.overlay} />

      {/* Centered content */}
      <View style={styles.content}>
        <Animated.Text
          style={[
            styles.logo,
            { opacity: logoOpacity, transform: [{ scale: logoScale }] },
          ]}
        >
          nomzy
        </Animated.Text>

        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          Food, delivered fast 🍔
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  bg: {
    position: "absolute",
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  logo: {
    fontSize: 52,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 2,
    textTransform: "lowercase",
  },
  tagline: {
    fontSize: 16,
    fontWeight: "400",
    color: "rgba(255,255,255,0.85)",
    letterSpacing: 0.5,
  },
});
