import { memo, useContext } from "react";
import { StyleSheet, View } from "react-native";
import themeContext from "../context/themeContext";

const MyRadio = ({ active }: any) => {
  const { whiteOrBlack } = useContext(themeContext);

  return (
    <View style={[styles.container, { borderColor: whiteOrBlack }]}>
      {active && (
        <View style={[styles.active, { backgroundColor: whiteOrBlack }]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderWidth: 3,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    width: 11,
    height: 11,
    borderRadius: 50,
  },
});

export default memo(MyRadio);
