import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LockIcon from "../components/icons/LockIcon";
import MailIcon from "../components/icons/MailIcon";
import UserIcon from "../components/icons/UserIcon";


// ─── Assets ──────────────────────────────────────────────────────────────────
const HERO_IMAGE = require("../../assets/nomz/splash_screen.jpeg");

// ─── Design tokens ───────────────────────────────────────────────────────────
const C = {
  bg: "#120D0A",
  surface: "#1B1410",
  card: "#241A15",
  orange: "#FF9F2D",
  gold: "#D89B3D",
  white: "#FFFFFF",
  secondary: "#A69385",
  border: "rgba(255,255,255,0.08)",
  inputBorder: "rgba(180,120,70,0.25)",
  inputBorderFocus: "#FF9F2D",
  overlay: "rgba(18,13,10,0.55)",
};

const { width, height } = Dimensions.get("window");
const HERO_HEIGHT = height * 0.38;

// ─── Spice particle ──────────────────────────────────────────────────────────
function SpiceParticle({ x, delay, size, opacity }) {
  const translateY = useRef(new Animated.Value(0)).current;
  const particleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(particleOpacity, {
            toValue: opacity,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -28,
            duration: 3200,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(particleOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: x,
        bottom: 12,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: C.gold,
        opacity: particleOpacity,
        transform: [{ translateY }],
      }}
    />
  );
}

// ─── Floating particles layer ─────────────────────────────────────────────────
const PARTICLES = [
  { x: "12%", delay: 0,    size: 4, opacity: 0.35 },
  { x: "28%", delay: 600,  size: 3, opacity: 0.25 },
  { x: "45%", delay: 1200, size: 5, opacity: 0.3  },
  { x: "62%", delay: 300,  size: 3, opacity: 0.2  },
  { x: "78%", delay: 900,  size: 4, opacity: 0.28 },
  { x: "88%", delay: 1500, size: 3, opacity: 0.22 },
];

// ─── Luxury text input ────────────────────────────────────────────────────────
function LuxuryInput({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType }) {
  const [focused, setFocused] = useState(false);
  const glowAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setFocused(true);
    Animated.timing(glowAnim, { toValue: 1, duration: 250, useNativeDriver: false }).start();
  };
  const handleBlur = () => {
    setFocused(false);
    Animated.timing(glowAnim, { toValue: 0, duration: 250, useNativeDriver: false }).start();
  };

  const borderColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [C.inputBorder, C.inputBorderFocus],
  });
  const shadowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.45],
  });

  // Pass focused state down so icon can change color on focus
  const iconColor = focused ? C.orange : C.secondary;

  return (
    <Animated.View
      style={[
        styles.inputWrapper,
        {
          borderColor,
          shadowColor: C.orange,
          shadowOpacity,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 0 },
          elevation: focused ? 6 : 0,
        },
      ]}
    >
      {/* Render the icon component with dynamic color */}
      <View style={styles.inputIconWrap}>
        {icon(iconColor)}
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={C.secondary}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        selectionColor={C.orange}
      />
    </Animated.View>
  );
}

// ─── Pill CTA button ──────────────────────────────────────────────────────────
function PillButton({ label, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 40 }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40 }).start();

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.pillButton, { transform: [{ scale }] }]}>
        <Text style={styles.pillLabel}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

// ─── Google social button ─────────────────────────────────────────────────────
function GoogleButton({ onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 40 }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40 }).start();

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.googleButton, { transform: [{ scale }] }]}>
        {/* Google "G" rendered with colored segments */}
        <View style={styles.googleIconContainer}>
          <Text style={styles.googleIconText}>G</Text>
        </View>
        <Text style={styles.googleLabel}>Continue with Google</Text>
      </Animated.View>
    </Pressable>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function AuthScreen() {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState("login"); // "login" | "signup"

  // Animation refs
  const heroOpacity  = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(60)).current;
  const formOpacity  = useRef(new Animated.Value(0)).current;

  // Form state
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  // Entrance animation
  useEffect(() => {
    Animated.sequence([
      Animated.timing(heroOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 550,
          useNativeDriver: true,
        }),
        Animated.spring(formTranslateY, {
          toValue: 0,
          friction: 8,
          tension: 60,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  // Re-animate form when switching modes
  const switchMode = (next) => {
    Animated.parallel([
      Animated.timing(formOpacity, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(formTranslateY, { toValue: 20, duration: 180, useNativeDriver: true }),
    ]).start(() => {
      setMode(next);
      setName(""); setEmail(""); setPassword("");
      Animated.parallel([
        Animated.timing(formOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.spring(formTranslateY, { toValue: 0, friction: 8, tension: 60, useNativeDriver: true }),
      ]).start();
    });
  };

  const isLogin = mode === "login";

  return (
    <View style={[styles.root, { backgroundColor: C.bg }]}>
      {/* ── Hero image ── */}
      <Animated.View style={[styles.heroContainer, { opacity: heroOpacity }]}>
        <Image source={HERO_IMAGE} style={styles.heroImage} resizeMode="cover" />

        {/* Vignette edges */}
        <View style={styles.vignetteLeft} />
        <View style={styles.vignetteRight} />

        {/* Gradient fade into form section */}
        <View style={styles.heroGradient} />

        {/* Brand mark on hero */}
        <View style={[styles.brandMark, { top: insets.top + 20 }]}>
          <Text style={styles.brandName}>nomzy</Text>
          <Text style={styles.brandDot}>•</Text>
        </View>
      </Animated.View>

      {/* ── Form section ── */}
      <View style={styles.formOuter}>
          <Animated.View
            style={[
              styles.formCard,
              {
                opacity: formOpacity,
                transform: [{ translateY: formTranslateY }],
              },
            ]}
          >
            {/* Floating spice particles */}
            <View style={styles.particleLayer} pointerEvents="none">
              {PARTICLES.map((p, i) => (
                <SpiceParticle key={i} {...p} />
              ))}
            </View>

            {/* Heading */}
            <Text style={styles.heading}>
              {isLogin ? "Welcome Back" : "Create Account"}
            </Text>
            <Text style={styles.subheading}>
              {isLogin
                ? "Sign in to continue your gourmet journey"
                : "Join us for an elevated dining experience"}
            </Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Inputs */}
            <View style={styles.inputs}>
              {!isLogin && (
                <LuxuryInput
                  icon={(color) => <UserIcon size={18} color={color} />}
                  placeholder="Full name"
                  value={name}
                  onChangeText={setName}
                />
              )}
              <LuxuryInput
                icon={(color) => <MailIcon size={18} color={color} />}
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <LuxuryInput
                icon={(color) => <LockIcon size={18} color={color} />}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Forgot password */}
            {isLogin && (
              <Pressable style={styles.forgotRow}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </Pressable>
            )}

            {/* CTA */}
            <View style={styles.ctaRow}>
              <PillButton
                label={isLogin ? "Sign In" : "Create Account"}
                onPress={() => {}}
              />
            </View>

            {/* Separator */}
            <View style={styles.separatorRow}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>or</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* Google */}
            <GoogleButton onPress={() => {}} />

            {/* Mode toggle */}
            <View style={styles.toggleRow}>
              <Text style={styles.togglePrompt}>
                {isLogin ? "New to Nomzy? " : "Already have an account? "}
              </Text>
              <Pressable onPress={() => switchMode(isLogin ? "signup" : "login")}>
                <Text style={styles.toggleAction}>
                  {isLogin ? "Create account" : "Sign in"}
                </Text>
              </Pressable>
            </View>
          </Animated.View>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  // Hero
  heroContainer: {
    width,
    height: HERO_HEIGHT,
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  vignetteLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 80,
    height: "100%",
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 20, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
  },
  vignetteRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 80,
    height: "100%",
    shadowColor: "#000",
    shadowOffset: { width: -20, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
  },
  heroGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: HERO_HEIGHT * 0.55,
    backgroundColor: C.bg,
    opacity: 0.82,
  },
  brandMark: {
    position: "absolute",
    left: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  brandName: {
    fontSize: 22,
    fontWeight: "800",
    color: C.white,
    letterSpacing: 2,
  },
  brandDot: {
    fontSize: 18,
    color: C.orange,
    fontWeight: "900",
  },

  // Form outer — fills remaining space below hero, no scroll
  formOuter: {
    flex: 1,
    marginTop: -28,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },

  // Form card
  formCard: {
    backgroundColor: C.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 24,
    elevation: 12,
    overflow: "hidden",
  },

  // Particles
  particleLayer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },

  // Heading
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: C.white,
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  subheading: {
    fontSize: 13,
    color: C.secondary,
    letterSpacing: 0.2,
    lineHeight: 18,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 14,
  },

  // Inputs
  inputs: {
    gap: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.card,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 50,
    gap: 10,
  },
  inputIconWrap: {
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    color: C.white,
    fontSize: 14.5,
    fontWeight: "400",
    letterSpacing: 0.2,
  },

  // Forgot
  forgotRow: {
    alignSelf: "flex-end",
    marginTop: 8,
    marginBottom: 2,
  },
  forgotText: {
    color: C.gold,
    fontSize: 12.5,
    fontWeight: "500",
    letterSpacing: 0.2,
  },

  // CTA
  ctaRow: {
    marginTop: 16,
  },
  pillButton: {
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.orange,
    shadowColor: C.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  pillBase: {},
  pillGoldTint: {},
  pillLabel: {
    color: C.white,
    fontSize: 15.5,
    fontWeight: "700",
    letterSpacing: 0.5,
    zIndex: 1,
  },

  // Separator
  separatorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
    gap: 12,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: C.border,
  },
  separatorText: {
    color: C.secondary,
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  // Google
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: "rgba(255,255,255,0.04)",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: C.white,
    alignItems: "center",
    justifyContent: "center",
  },
  googleIconText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#4285F4",
  },
  googleLabel: {
    color: C.white,
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.2,
  },

  // Toggle
  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  togglePrompt: {
    color: C.secondary,
    fontSize: 13,
  },
  toggleAction: {
    color: C.orange,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});
