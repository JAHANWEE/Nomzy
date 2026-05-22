import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CategoryRow from "../components/home/CategoryRow";
import FeaturedBanner from "../components/home/FeaturedBanner";
import HomeHeader from "../components/home/HomeHeader";
import NearbyRestaurants from "../components/home/NearbyRestaurants";
import PopularRestaurants from "../components/home/PopularRestaurants";
import RecommendedSection from "../components/home/RecommendedSection";
import BottomNav from "../components/navigation/BottomNav";
import { C } from "../data/homeData";

const NAV_HEIGHT = 80;

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("home");

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (tab === "search") navigation.navigate("Discovery");
  };

  return (
    <View style={styles.root}>
      <HomeHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: NAV_HEIGHT + insets.bottom + 24 },
        ]}
      >
        <View style={styles.section}>
          <FeaturedBanner />
        </View>

        <View style={styles.section}>
          <CategoryRow />
        </View>

        <View style={styles.section}>
          <PopularRestaurants />
        </View>

        <View style={styles.section}>
          <RecommendedSection />
        </View>

        <View style={styles.section}>
          <NearbyRestaurants />
        </View>
      </ScrollView>

      <BottomNav activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scrollContent: {
    paddingTop: 8,
  },
  section: {
    marginBottom: 28,
  },
});
