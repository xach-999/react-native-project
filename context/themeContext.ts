import { createContext } from "react";

interface ThemeContextProps {
  isDark: boolean;
  changeMode: () => void;
  whiteOrBlack: string;
  eerieBlueOrWhite: string;
  sGrayOrLGray: string;
  darkBlueOrWhite: string;
}

const themeContext = createContext({} as ThemeContextProps);

export default themeContext;
