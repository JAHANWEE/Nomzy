import { Pressable, StyleSheet, Text, View } from "react-native";
import { C } from "../../data/homeData";

export default function SectionHeader({ title, onSeeAll }) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={onSeeAll}>
        <Text style={styles.seeAll}>See All</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: C.white,
    letterSpacing: 0.2,
  },
  seeAll: {
    fontSize: 13,
    color: C.orange,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});
