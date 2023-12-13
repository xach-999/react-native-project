import { useContext } from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import themeContext from "../context/themeContext";
import colors from "../styles/colors";
import { useTranslation } from "react-i18next";

interface PropsType {
  text: string;
  darkText: string;
  onPress: () => void;
}

export default function HaveAnAccount(props: PropsType) {
  const { text, darkText, onPress } = props;
  const { t } = useTranslation();
  const { whiteOrBlack, isDark } = useContext(themeContext);

  return (
    <View style={styles.bottom_block}>
      <Text
        style={[
          styles.bottom_block_text,
          { color: isDark ? colors.darkGray : colors.eerieGrey },
        ]}
      >
        {t(text) + " "}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.bottom_block_dark_text, { color: whiteOrBlack }]}>
          {t(darkText)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottom_block: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  bottom_block_text: {
    fontSize: 13,
  },
  bottom_block_dark_text: {
    fontSize: 14,
  },
});
