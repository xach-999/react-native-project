import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import themeContext from "../../../context/themeContext";

export default function SizeSection() {
  const { t } = useTranslation();
  const { whiteOrBlack } = useContext(themeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.descriptionTitle, { color: whiteOrBlack }]}>
        {t("Size")}
      </Text>
      <View style={styles.sizeContainer}>
        <View style={[styles.sizeItemBlock, { borderColor: whiteOrBlack }]}>
          <Text style={[styles.sizeItem, { color: whiteOrBlack }]}>S</Text>
        </View>
        <View style={[styles.sizeItemBlock, { borderColor: whiteOrBlack }]}>
          <Text style={[styles.sizeItem, { color: whiteOrBlack }]}>M</Text>
        </View>
        <View style={[styles.sizeItemBlock, { borderColor: whiteOrBlack }]}>
          <Text style={[styles.sizeItem, { color: whiteOrBlack }]}>L</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  descriptionTitle: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 8,
  },
  sizeContainer: {
    flexDirection: "row",
    gap: 10,
  },
  sizeItemBlock: {
    width: 38,
    height: 38,
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeItem: {
    fontWeight: "500",
    fontSize: 15,
  },
});
