import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import themeContext from "../../../context/themeContext";

export default function DescriptionSection({ description }: any) {
  const { t } = useTranslation();
  const { whiteOrBlack } = useContext(themeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.descriptionTitle, { color: whiteOrBlack }]}>
        {t("Description")}
      </Text>
      <Text style={[styles.description, { color: whiteOrBlack }]}>
        {description}
      </Text>
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
  },
  description: {
    marginTop: 8,
  },
});
