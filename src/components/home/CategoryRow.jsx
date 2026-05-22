import { useRef, useState } from "react";
import {
    Animated,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { C, CATEGORIES } from "../../data/homeData";
import SectionHeader from "./SectionHeader";

function CategoryItem({ item, selected, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, speed: 40 }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40 }).start();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.item, { transform: [{ scale }] }]}>
        <View style={[
          styles.circle,
          selected && styles.circleSelected,
        ]}>
          <Text style={styles.emoji}>{item.emoji}</Text>
          {selected && <View style={styles.glow} />}
        </View>
        <Text style={[styles.label, selected && styles.labelSelected]}>
          {item.label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export default function CategoryRow() {
  const [selected, setSelected] = useState("1");

  return (
    <View style={styles.root}>
      <SectionHeader title="Categories" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {CATEGORIES.map((cat) => (
          <CategoryItem
            key={cat.id}
            item={cat}
            selected={selected === cat.id}
            onPress={() => setSelected(cat.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
  scroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
  item: {
    alignItems: "center",
    gap: 8,
  },
  circle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  circleSelected: {
    borderColor: C.orange,
    borderWidth: 1.5,
    backgroundColor: "rgba(255,159,45,0.1)",
    shadowColor: C.orange,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
  },
  glow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 31,
    backgroundColor: "rgba(255,159,45,0.08)",
  },
  emoji: {
    fontSize: 26,
  },
  label: {
    fontSize: 11.5,
    color: C.secondary,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  labelSelected: {
    color: C.orange,
    fontWeight: "600",
  },
});
