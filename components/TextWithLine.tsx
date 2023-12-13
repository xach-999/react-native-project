import { memo, useContext } from "react";
import { StyleSheet, Text, View, ViewStyle, TextStyle } from "react-native";
import themeContext from "../context/themeContext";
import { useTranslation } from "react-i18next";

interface PropsType {
  text: string;
  style?: ViewStyle | TextStyle;
}

const TextWithLine = (props: PropsType) => {
  const { text, style } = props;
  const { t } = useTranslation();
  const { sGrayOrLGray, whiteOrBlack } = useContext(themeContext);

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.line, { backgroundColor: sGrayOrLGray }]} />
      <Text style={[styles.text, { color: whiteOrBlack }]}>{t(text)}</Text>
      <View style={[styles.line, { backgroundColor: sGrayOrLGray }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 1,
  },
  text: {
    textAlign: "center",
    fontSize: 17,
    paddingHorizontal: 10,
  },
});

export default memo(TextWithLine);
