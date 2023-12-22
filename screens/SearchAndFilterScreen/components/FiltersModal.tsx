import { View, Text, StyleSheet } from "react-native";
import CategoryList from "./CategoryList";
import { useTranslation } from "react-i18next";
import themeContext from "../../../context/themeContext";
import { useContext, useState } from "react";
import MyButton from "../../../ui/MyButton";
import PriceRangeSlider from "./PriceRangeSlider";
import SortByList from "./SortByList";
import RatingList from "./RatingList";

export default function FilterModal({
  priceRange,
  categoryId,
  setCategoryId,
  onPressReset,
  onPressApply,
}: any) {
  const { t } = useTranslation();
  const { sGrayOrLGray, whiteOrBlack, eerieBlueOrWhite } =
    useContext(themeContext);

    const [rangeData, setRangeData] = useState([
      priceRange[0],
      priceRange[1],
    ]);

  return (
    <View style={{ backgroundColor: eerieBlueOrWhite }}>
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
        <Text style={[styles.subHeader, { color: whiteOrBlack }]}>
          {t("Categories")}
        </Text>
        <CategoryList categoryId={categoryId} setCategoryId={setCategoryId} />

        <Text style={[styles.subHeader, { color: whiteOrBlack }]}>
          {t("Price Range")}
        </Text>
        <PriceRangeSlider rangeData={rangeData} setRangeData={setRangeData} />

        <Text style={[styles.subHeader, { color: whiteOrBlack }]}>
          {t("Sort by")}
        </Text>
        <SortByList />

        <Text style={[styles.subHeader, { color: whiteOrBlack }]}>
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
          onPress={() => onPressApply({rangeData, categoryId})}
        />
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
  header: {
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 20,
    fontSize: 22,
    fontWeight: "500",
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  subHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    fontWeight: "500",
    fontSize: 18,
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
