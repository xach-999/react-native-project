import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import MyButton from "../../../components/MyButton";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import colors from "../../../styles/colors";
import themeContext from "../../../context/themeContext";

export default function PriceSection({ price }: any) {
  const { t } = useTranslation();
  const { isDark, whiteOrBlack, sGrayOrLGray } = useContext(themeContext);

  return (
    <View style={[styles.priceContainer, { borderColor: sGrayOrLGray }]}>
      <View style={styles.priceTextContainer}>
        <Text style={[styles.priceLabel, { color: whiteOrBlack }]}>
          {t("Total price")}
        </Text>
        <Text style={[styles.priceValue, { color: whiteOrBlack }]}>
          ${price}
        </Text>
      </View>
      <MyButton
        text="Add to Cart"
        style={[styles.addToCartButton, { backgroundColor: whiteOrBlack }]}
        leftIcon={
          <FontAwesome5
            name="shopping-bag"
            size={15}
            color={isDark ? colors.black : colors.white}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    paddingTop: 15,
  },
  priceTextContainer: {
    width: 120,
  },
  priceLabel: {
    fontSize: 12,
  },
  priceValue: {
    fontSize: 22,
    fontWeight: "500",
  },
  addToCartButton: {
    flex: 1,
  },
});
