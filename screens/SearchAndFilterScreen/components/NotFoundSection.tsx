import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View, Image, Text, StyleSheet } from "react-native";
import themeContext from "../../../context/themeContext";

const notFoundImg = require("../../../assets/not_found.png");

export default function NotFoundSection() {
  const { t } = useTranslation();
  const { whiteOrBlack } = useContext(themeContext);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={notFoundImg} />
      <Text style={[styles.title, { color: whiteOrBlack }]}>
        {t("Not Found")}
      </Text>
      <Text style={[styles.description, { color: whiteOrBlack }]}>
        {t("notFoundMessage")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 230,
    height: 250,
    resizeMode: "contain",
    marginTop: "-20%",
  },
  title: {
    marginTop: 25,
    fontSize: 22,
    fontWeight: "700",
  },
  description: {
    marginTop: 10,
    fontSize: 17,
    textAlign: "center",
    fontWeight: "400",
  },
});
