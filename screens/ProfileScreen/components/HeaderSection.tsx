import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import themeContext from "../../../context/themeContext";
import { useTranslation } from "react-i18next";

const iconProfile = require("../../../assets/profile_icon.png");
const iconProfileWhite = require("../../../assets/profile_white_icon.png");

export function HeaderSection() {
  const { t } = useTranslation();
  const { isDark, whiteOrBlack } = useContext(themeContext);

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Image
          source={isDark ? iconProfileWhite : iconProfile}
          style={styles.profileImage}
        />
        <Text style={[styles.headerText, { color: whiteOrBlack }]}>
          {t("Profile")}
        </Text>
      </View>
      <MaterialCommunityIcons
        name="dots-horizontal-circle-outline"
        size={28}
        color={whiteOrBlack}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 30,
    height: 30,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "500",
    marginLeft: 10,
  },
});
