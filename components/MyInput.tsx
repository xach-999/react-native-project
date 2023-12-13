import { TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import React, { useContext, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import themeContext from "../context/themeContext";
import colors from "../styles/colors";

interface PropsType {
  leftIcon?: any;
  rightIcon?: any;
  clickRightIcon?: any;
  inputProps?: any;
  isPassword?: any;
  style?: any;
}

export default function MyInput(props: PropsType) {
  const { leftIcon, rightIcon, clickRightIcon, inputProps, isPassword, style } =
    props;

  const { isDark, whiteOrBlack } = useContext(themeContext);
  const [showPassword, setShowPassword] = useState<any>(isPassword);

  const leftIconProps = {
    style: styles.left_icon,
    size: 20,
    color: inputProps?.value
      ? isDark
        ? colors.white
        : colors.black
      : colors.eerieGrey,
  };

  const rightIconProps = {
    size: 20,
    color: inputProps?.value
      ? isDark
        ? colors.white
        : colors.black
      : colors.eerieGrey,
  };

  const onPressRightIcon = () => {
    if (isPassword) {
      setShowPassword(!showPassword);
      return;
    }
    clickRightIcon && clickRightIcon();
  };

  return (
    <View style={[styles.container, style && style]}>
      {leftIcon && React.cloneElement(leftIcon, leftIconProps)}
      <TextInput
        style={[
          styles.input,
          leftIcon && styles.input_with_left_icon,
          rightIcon && styles.input_with_right_icon,
          {
            backgroundColor: isDark ? colors.darkBlue : colors.whiteSmoke,
            color: whiteOrBlack,
          },
        ]}
        placeholderTextColor={colors.eerieGrey}
        secureTextEntry={showPassword}
        {...inputProps}
      />
      {(!!rightIcon || isPassword) && (
        <TouchableOpacity
          disabled={!clickRightIcon && !isPassword}
          style={styles.right_icon}
          onPress={onPressRightIcon}
        >
          {isPassword ? (
            <MaterialCommunityIcons
              {...rightIconProps}
              name={showPassword ? "eye-off" : "eye"}
            />
          ) : (
            React.cloneElement(rightIcon, rightIconProps)
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 20,
  },
  left_icon: {
    position: "absolute",
    zIndex: 1,
    left: 15,
    margin: "auto",
  },
  input_with_left_icon: {
    paddingLeft: 45,
  },
  right_icon: {
    position: "absolute",
    zIndex: 1,
    right: 15,
    margin: "auto",
  },
  input_with_right_icon: {
    paddingRight: 45,
  },
});
