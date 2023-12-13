import { StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useContext } from "react";
import themeContext from "../context/themeContext";
import colors from "../styles/colors";
import { useTranslation } from "react-i18next";

interface PropsType {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  text?: string;
  style?: any;
}

export default function MyCheckbox(props: PropsType) {
  const { value, onValueChange, text, style } = props;
  const { isDark, whiteOrBlack } = useContext(themeContext);
  const { t }: any = useTranslation();

  return (
    <View style={[styles.container, style && style]}>
      <Checkbox
        style={styles.checkbox}
        value={value}
        onValueChange={onValueChange}
        color={isDark ? colors.slateGray : colors.black}
      />
      <Text style={[styles.text, { color: whiteOrBlack }]}>{t(text)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
    marginVertical: 25,
  },
  text: {
    fontSize: 14,
  },
  checkbox: {
    borderRadius: 6,
    borderWidth: 3,
  },
});
