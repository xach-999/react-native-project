import { DefaultTheme } from "@react-navigation/native";
import colors from "./colors";

export const themeDark = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.eerieBlue,
    card: colors.eerieBlue,
    border: colors.eerieBlue,
  },
};

export const themeLight = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.white,
    card: colors.white,
    border: colors.white,
  },
};
