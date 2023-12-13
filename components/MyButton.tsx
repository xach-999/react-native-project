import { useContext } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import themeContext from "../context/themeContext";
import colors from "../styles/colors";
import { useTranslation } from "react-i18next";

interface PropsType {
  text: string;
  disabled?: boolean;
  onPress?: any;
  style?: any;
  leftIcon?: any;
  textStyle?: any;
}
const MyButton = (props: PropsType) => {
  const { text, onPress, disabled, style, leftIcon, textStyle } = props;
  const { isDark, whiteOrBlack } = useContext(themeContext);
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: whiteOrBlack },
        style,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {!!leftIcon && leftIcon}
      <Text
        style={[
          styles.sign_in_btn_text,
          {
            color:
              isDark && disabled
                ? colors.white
                : isDark
                  ? colors.black
                  : colors.white,
          },
          textStyle,
        ]}
      >
        {t(text)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 15,
  },
  sign_in_btn_text: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  disabled: {
    backgroundColor: colors.eerieGrey,
  },
});

export default MyButton;
