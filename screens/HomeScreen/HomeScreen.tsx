import { RefreshControl, StyleSheet, Text, View } from "react-native";
import HomeScreenHeader from "./components/HomeScreenHeader";
import { useDispatch } from "../../features/store";
import Constants from "expo-constants";
import { ScrollView } from "react-native-virtualized-view";
import { useCallback, useContext, useEffect, useState } from "react";
import { getCategories } from "../../features/CategoriesSlice/CategoriesSlice";
import InputSection from "./components/InputSection";
import SpecialOffersCategories from "./components/SpecialOffersCategories";
import MostPopularSection from "./components/MostPopularSection";
import SpecialOffersCarousel from "./components/SpecialOffersCarousel";
import { useTranslation } from "react-i18next";
import themeContext from "../../context/themeContext";

export default function HomeScreen(props: any) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { eerieBlueOrWhite, whiteOrBlack } = useContext(themeContext);
  const [refreshLoading, setRefreshLoading] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshLoading(true);
    await dispatch(getCategories());
    setRefreshLoading(false);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <View>
        <HomeScreenHeader />
        <InputSection navigation={navigation} />
      </View>
      <ScrollView
        style={styles.scroll_part}
        refreshControl={
          <RefreshControl refreshing={refreshLoading} onRefresh={onRefresh} />
        }
      >
        <View>
          <View style={styles.header_part}>
            <Text
              style={[styles.header_part_first_text, { color: whiteOrBlack }]}
            >
              {t("Special Offers")}
            </Text>
            <Text
              style={[styles.header_part_second_text, { color: whiteOrBlack }]}
            >
              {t("See All")}
            </Text>
          </View>
          <View style={styles.carousel_block}>
            <SpecialOffersCarousel />
          </View>
          <SpecialOffersCategories navigation={navigation} />
        </View>
        <View>
          <View style={styles.header_part}>
            <Text
              style={[styles.header_part_first_text, { color: whiteOrBlack }]}
            >
              {t("Most Popular")}
            </Text>
            <Text
              style={[styles.header_part_second_text, { color: whiteOrBlack }]}
            >
              {t("See All")}
            </Text>
          </View>
          <MostPopularSection navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  scroll_part: {
    flex: 1,
  },
  header_part: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header_part_first_text: {
    fontWeight: "500",
    fontSize: 18,
  },
  header_part_second_text: {
    fontWeight: "500",
    fontSize: 15,
  },
  carousel_block: {
    display: "flex",
    alignItems: "center",
  },
});
