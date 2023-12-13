import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import themeContext from "../../../context/themeContext";

export default function QuantitySection() {
  const { t } = useTranslation();
  const { sGrayOrLGray, whiteOrBlack } = useContext(themeContext);

  return (
    <View style={styles.quantityContainer}>
      <Text style={[styles.quantityTitle, { color: whiteOrBlack }]}>
        {t("Quantity")}
      </Text>
      <View style={[styles.quantityContent, { backgroundColor: sGrayOrLGray }]}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="minus" size={24} color={whiteOrBlack} />
        </TouchableOpacity>
        <Text style={[styles.quantityText, { color: whiteOrBlack }]}>1</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="plus" size={24} color={whiteOrBlack} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityTitle: {
    fontWeight: "500",
    fontSize: 18,
  },
  quantityContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginLeft: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
  },
  quantityText: {
    width: 30,
    textAlign: "center",
  },
});
