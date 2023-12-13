import React, { memo, useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import themeContext from "../../../context/themeContext";
import { Ionicons } from "@expo/vector-icons";

const DarkModeSection = () => {
  const { isDark, changeMode, whiteOrBlack } = useContext(themeContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={changeMode}>
        <Ionicons
          name={isDark ? "sunny" : "moon"}
          size={28}
          color={whiteOrBlack}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default memo(DarkModeSection);
