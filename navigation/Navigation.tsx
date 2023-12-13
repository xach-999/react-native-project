import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import BottomTabs from "../app/tabs/bottom/_layout";
import LendingScreen from "../screens/LendingScreen/LendingScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import { useSelector, useDispatch } from "../state/store";
import { useContext, useEffect } from "react";
import { getAuthorizedUser } from "../state/UserSlice/UserSlice";
import ProductsForCategoryScreen from "../screens/ProductsForCategoryScreen/ProductsForCategoryScreen";
import ProductScreen from "../screens/ProductScreen/ProductScreen";
import SearchAndFilterScreen from "../screens/SearchAndFilterScreen/SearchAndFilterScreen";
import FilterScreen from "../screens/FilterScreen/FilterScreen";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";
import AddressScreen from "../screens/AddressScreen/AddressScreen";
import PaymentScreen from "../screens/PaymentScreen/PaymentScreen";
import AddNewCardScreen from "../screens/AddNewCardScreen/AddNewCardScreen";
import SecurityScreen from "../screens/SecurityScreen/SecurityScreen";
import LanguageScreen from "../screens/LanguageScreen/LanguageScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen/PrivacyPolicyScreen";
import InviteFriendsScreen from "../screens/InviteFriendsScreen/InviteFriendsScreen";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import themeContext from "../context/themeContext";
import colors from "../styles/colors";

const Stack = createStackNavigator();

function AuthScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Lending" component={LendingScreen} />
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
    </Stack.Navigator>
  );
}

function AppScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen
          name="Products For Category"
          component={ProductsForCategoryScreen}
        />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen
          name="Search & Filter"
          component={SearchAndFilterScreen}
        />
        <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Add New Card" component={AddNewCardScreen} />
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="Invite Friends" component={InviteFriendsScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
        <Stack.Screen name="Filter" component={FilterScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

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

  const themeDark = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.eerieBlue,
      card: colors.eerieBlue,
      border: colors.eerieBlue,
    },
  };

  const themeLight = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.white,
      card: colors.white,
      border: colors.white,
    },
  };

  return (
    <NavigationContainer theme={isDark ? themeDark : themeLight}>
      {loading ? <Loading /> : user.email ? <AppScreens /> : <AuthScreens />}
    </NavigationContainer>
  );
}
