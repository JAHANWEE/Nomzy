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
import { C } from "../data/homeData";

const NAV_HEIGHT = 80;

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <HomeHeader navigation={navigation} />

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
          <PopularRestaurants navigation={navigation} />
        </View>

        <View style={styles.section}>
          <RecommendedSection navigation={navigation} />
        </View>

        <View style={styles.section}>
          <NearbyRestaurants navigation={navigation} />
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
  scrollContent: {
    paddingTop: 8,
  },
  section: {
    marginBottom: 28,
  },
});
