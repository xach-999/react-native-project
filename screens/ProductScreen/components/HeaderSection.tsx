import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import colors from "../../../content/colors";
import themeContext from "../../../context/themeContext";

export default function HeaderSection({ title }: any) {
  const { t } = useTranslation();
  const { whiteOrBlack, sGrayOrLGray } = useContext(themeContext);

  return (
    <View style={[styles.innerDetailsContainer, { borderColor: sGrayOrLGray }]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: whiteOrBlack }]}>{title}</Text>
        <Ionicons name="heart-outline" size={30} color={whiteOrBlack} />
      </View>
      <View style={styles.ratingContainer}>
        <View
          style={[styles.productSoldBlock, { backgroundColor: sGrayOrLGray }]}
        >
          <Text style={[styles.productSoldText, { color: whiteOrBlack }]}>
            8,374
          </Text>
          <MaterialCommunityIcons
            name="cart-arrow-up"
            size={15}
            color={whiteOrBlack}
          />
        </View>
        <Ionicons name="md-star" size={22} color={colors.darkGray} />
        <Text style={{ marginLeft: 6, color: whiteOrBlack }}>4.5 (4,749 {t("reviews")})</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerDetailsContainer: {
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    paddingBottom: 15,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    flex: 1,
    flexWrap: "wrap",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  productSoldBlock: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 3,
    marginRight: 10,
  },
  productSoldText: {
    fontSize: 10,
  },
});
