import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import themeContext from "../../../context/themeContext";
import colors from "../../../content/colors";

export default function ColorSection() {
  const { t } = useTranslation();
  const { whiteOrBlack } = useContext(themeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.descriptionTitle, { color: whiteOrBlack }]}>
        {t("Color")}
      </Text>
      <View style={styles.colorContainer}>
        <View style={[styles.colorItemBlock, { backgroundColor: "#607D8A" }]}>
          <MaterialCommunityIcons name="check-bold" size={20} color={colors.white} />
        </View>
        <View style={[styles.colorItemBlock, { backgroundColor: "#7A5548" }]} />
        <View style={[styles.colorItemBlock, { backgroundColor: "#797979" }]} />
        <View style={[styles.colorItemBlock, { backgroundColor: "#9F9F9F" }]} />
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
  colorContainer: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  colorItemBlock: {
    width: 38,
    height: 38,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
