import React, { memo, useContext } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import themeContext from "../context/themeContext";

const LoadingScreen = ({size = "large"}: any) => {
  const { whiteOrBlack } = useContext(themeContext);

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={size}
        color={whiteOrBlack}
        style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default memo(LoadingScreen);
