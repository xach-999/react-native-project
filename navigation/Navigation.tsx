import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "../features/store";
import { useContext, useEffect } from "react";
import { getAuthorizedUser } from "../features/UserSlice/UserSlice";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import themeContext from "../context/themeContext";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { themeDark, themeLight } from "../content/navigatorTheme";

export default function Navigation() {
  const { loading, user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { isDark } = useContext(themeContext);

  useEffect(() => {
    dispatch(getAuthorizedUser());
    changeDefaultLanguage();
  }, []);

  const changeDefaultLanguage = async () => {
    try {
      const language: any = await AsyncStorage.getItem("language");
      if (language) {
        i18n.changeLanguage(JSON.parse(language));
      }
    } catch (error) {
      console.error("Error retrieving language:", error);
    }
  };

  return (
    <NavigationContainer theme={isDark ? themeDark : themeLight}>
      {loading ? <Loading /> : user.email ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
