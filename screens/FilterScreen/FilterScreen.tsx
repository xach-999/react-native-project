import React, { useState, useCallback, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import MyButton from "../../components/MyButton";
import CategoryList from "./components/CategoryList";
import PriceRangeSlider from "./components/PriceRangeSlider";
import SortByList from "./components/SortByList";
import RatingList from "./components/RatingList";
import { globalStyles } from "../../content/style";
import { useDispatch, useSelector } from "../../state/store";
import {
  resetFilterParams,
  setFilterParams,
} from "../../state/FilterSlice/FilterSlice";
import { useTranslation } from "react-i18next";
import themeContext from "../../context/themeContext";
import { useRoute } from "@react-navigation/native";

export default function FilterScreen({ navigation }: any) {
  const route = useRoute();
  const { searchProducts }: any = route.params;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sGrayOrLGray, whiteOrBlack, eerieBlueOrWhite } =
    useContext(themeContext);

  const { filterParams, productMinPrice, productMaxPrice } = useSelector(
    (state) => state.filterSlice
  );

  const [categoryId, setCategoryId] = useState(
    filterParams.categoryId || ""
  );
  const [rangeData, setRangeData] = useState<any>([
    filterParams.price_min || productMinPrice,
    filterParams.price_max || productMaxPrice,
  ]);

  const onTouchBlackPart = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPressReset = useCallback(() => {
    setCategoryId("");
    setRangeData([productMinPrice, productMaxPrice]);
    dispatch(resetFilterParams());
  }, []);

  const onPressApply = useCallback(() => {
    const date = {
      price_min: rangeData[0],
      price_max: rangeData[1],
      categoryId,
    };
    dispatch(setFilterParams(date));
    searchProducts("", date)
    onTouchBlackPart();
  }, [rangeData, categoryId]);

  return (
    <View style={styles.container}>
      <View style={[styles.overlay]} onTouchEnd={onTouchBlackPart} />
      <View style={[styles.content, { backgroundColor: eerieBlueOrWhite }]}>
        <Text
          style={[
            styles.header,
            {
              color: whiteOrBlack,
              borderColor: sGrayOrLGray,
            },
          ]}
        >
          {t("Sort & Filter")}
        </Text>
        <View>
          <Text style={[globalStyles.subHeader, { color: whiteOrBlack }]}>
            {t("Categories")}
          </Text>
          <CategoryList categoryId={categoryId} setCategoryId={setCategoryId} />

          <Text style={[globalStyles.subHeader, { color: whiteOrBlack }]}>
            {t("Price Range")}
          </Text>
          <PriceRangeSlider rangeData={rangeData} setRangeData={setRangeData} />

          <Text style={[globalStyles.subHeader, { color: whiteOrBlack }]}>
            {t("Sort by")}
          </Text>
          <SortByList />

          <Text style={[globalStyles.subHeader, { color: whiteOrBlack }]}>
            {t("Rating")}
          </Text>
          <RatingList />
        </View>

        <View style={[styles.buttonContainer, { borderColor: sGrayOrLGray }]}>
          <MyButton
            text="Reset"
            style={[styles.resetButton, { backgroundColor: sGrayOrLGray }]}
            textStyle={{ color: whiteOrBlack }}
            onPress={onPressReset}
          />
          <MyButton
            text="Apply"
            style={[styles.applyButton, { backgroundColor: whiteOrBlack }]}
            onPress={onPressApply}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.7,
    marginBottom: -100,
  },
  content: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  header: {
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 22,
    fontWeight: "500",
    borderBottomWidth: 1,
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  buttonContainer: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 10,
    marginTop: 20,
    borderTopWidth: 1,
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  resetButton: {
    flex: 1,
  },
  applyButton: {
    flex: 1,
  },
});
