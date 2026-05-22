import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Polyline } from "react-native-svg";
import SidebarButton from "../components/navigation/SidebarButton";
import { C } from "../data/homeData";

function BackIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"
      stroke={C.white} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M19 12H5" />
      <Polyline points="12 19 5 12 12 5" />
    </Svg>
  );
}

export default function HelpScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <BackIcon />
        </Pressable>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Help & Support</Text>
          <Text style={styles.subtitle}>Order assistance and account support</Text>
        </View>
        <SidebarButton />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Support</Text>
          <Text style={styles.cardText}>Track active orders from My Orders or contact support if an item is missing.</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payments</Text>
          <Text style={styles.cardText}>Payment totals and delivery fees are shown in the cart before confirmation.</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact</Text>
          <Text style={styles.cardText}>support@nomzy.app</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
  },
  titleBlock: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: C.white,
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    color: C.secondary,
    fontSize: 12,
  },
  content: {
    paddingHorizontal: 20,
    gap: 12,
    paddingBottom: 28,
  },
  card: {
    gap: 7,
    padding: 16,
    borderRadius: 18,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
  },
  cardTitle: {
    color: C.white,
    fontSize: 15,
    fontWeight: "700",
  },
  cardText: {
    color: C.secondary,
    fontSize: 13,
    lineHeight: 20,
  },
});
