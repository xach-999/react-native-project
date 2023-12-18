import { store } from "./features/store";
import { Provider } from "react-redux";
import Navigation from "./navigation/Navigation";
import { useEffect, useState } from "react";
import { db } from "./db/db";
import i18n from "./constants/i18n";
import themeContext from "./context/themeContext";
import colors from "./content/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  i18n;
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists token (id integer primary key not null, access_token text, refresh_token text);"
      );
    });
    getModeInStorage();
  }, []);

  const setModeInStorage = async (dark: boolean) => {
    try {
      await AsyncStorage.setItem("isDark", JSON.stringify(dark));
    } catch (error) {
      console.error("Error saving mode:", error);
    }
  };

  const getModeInStorage = async () => {
    try {
      const dark: any = await AsyncStorage.getItem("isDark");
      setIsDark(!!JSON.parse(dark));
    } catch (error) {
      console.error("Error retrieving mode:", error);
    }
  };

  const changeMode = () => {
    setIsDark(!isDark);
    setModeInStorage(!isDark);
  };

  return (
    <themeContext.Provider
      value={{
        isDark,
        changeMode,
        whiteOrBlack: isDark ? colors.white : colors.black,
        eerieBlueOrWhite: isDark ? colors.eerieBlue : colors.white,
        sGrayOrLGray: isDark ? colors.slateGray : colors.lightGray,
        darkBlueOrWhite: isDark ? colors.darkBlue : colors.white,
      }}
    >
      <Provider store={store}>
        <Navigation />
      </Provider>
    </themeContext.Provider>
  );
}
