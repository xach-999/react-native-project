import React, { memo, useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useSelector } from "../../../state/store";
import themeContext from "../../../context/themeContext";

const width = Dimensions.get("window").width;

const PriceRangeSlider = ({ rangeData, setRangeData }: any) => {
  const { sGrayOrLGray, whiteOrBlack } = useContext(themeContext);
  const { productMinPrice, productMaxPrice } = useSelector(
    (state) => state.filterSlice
  );

  return (
    <View style={styles.container}>
      <View style={styles.priceRange}>
        <Text style={[styles.priceText, { color: whiteOrBlack }]}>
          Min: {rangeData[0] || 0}$
        </Text>
        <Text style={[styles.priceText, { color: whiteOrBlack }]}>
          Max: {rangeData[1] || 0}$
        </Text>
      </View>
      <MultiSlider
        values={[rangeData[0], rangeData[1]]}
        sliderLength={width - 40}
        onValuesChange={setRangeData}
        min={productMinPrice}
        max={productMaxPrice}
        step={1}
        markerStyle={{
          ...styles.marker,
          backgroundColor: whiteOrBlack,
        }}
        trackStyle={{
          backgroundColor: sGrayOrLGray,
        }}
        selectedStyle={{
          ...styles.selectedTrack,
          backgroundColor: whiteOrBlack,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: "100%",
  },
  priceRange: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
  },
  priceText: {
    fontWeight: "700",
  },
  marker: {
    height: 20,
    width: 20,
  },
  selectedTrack: {
    height: 3,
  },
});

export default memo(PriceRangeSlider);
