import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
} from "react-native-reanimated";
import Svg, { Line, Path } from "react-native-svg";
import { C } from "../../data/discoveryData";

function XIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"
      stroke="#FF4D6D" strokeWidth={2} strokeLinecap="round">
      <Line x1="18" y1="6" x2="6" y2="18" />
      <Line x1="6" y1="6" x2="18" y2="18" />
    </Svg>
  );
}

function MenuIcon() {
  // Fork on left, knife on right — proper restaurant/dining icon
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"
      stroke={C.white} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {/* Fork: handle + two tines */}
      <Path d="M7 2v4" />
      <Path d="M5 2v4" />
      <Path d="M9 2v4" />
      <Path d="M7 6a2 2 0 000 4v10" />
      {/* Knife: straight blade tapering to point, handle at bottom */}
      <Path d="M17 2c0 0-3 2-3 6v4h6V8c0-4-3-6-3-6z" />
      <Path d="M17 12v10" />
    </Svg>
  );
}

function HeartFillIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24"
      fill={C.orange} stroke={C.orange} strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round">
      <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </Svg>
  );
}

function ActionButton({ onPress, children, glowColor, size = 56 }) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.88, { damping: 10, stiffness: 300 }),
      withSpring(1, { damping: 12, stiffness: 200 })
    );
    onPress?.();
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        style={[
          styles.btn,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            shadowColor: glowColor,
          },
          animStyle,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

export default function ActionBar({ onPass, onViewMenu, onSave }) {
  return (
    <View style={styles.root}>
      <View style={styles.bar}>
        <ActionButton onPress={onPass} glowColor="#FF4D6D" size={52}>
          <XIcon />
        </ActionButton>

        <ActionButton onPress={onViewMenu} glowColor={C.white} size={62}>
          <MenuIcon />
          <Text style={styles.menuLabel}>Menu</Text>
        </ActionButton>

        <ActionButton onPress={onSave} glowColor={C.orange} size={52}>
          <HeartFillIcon />
        </ActionButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingBottom: 8,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "rgba(27,20,16,0.92)",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: C.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 14,
  },
  btn: {
    backgroundColor: C.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: C.border,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
    gap: 2,
  },
  menuLabel: {
    fontSize: 9,
    color: C.white,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
