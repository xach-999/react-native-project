import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import ProductsForCategoryScreen from "../screens/ProductsForCategoryScreen/ProductsForCategoryScreen";
import ProductScreen from "../screens/ProductScreen/ProductScreen";
import SearchAndFilterScreen from "../screens/SearchAndFilterScreen/SearchAndFilterScreen";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";
import AddressScreen from "../screens/AddressScreen/AddressScreen";
import PaymentScreen from "../screens/PaymentScreen/PaymentScreen";
import AddNewCardScreen from "../screens/AddNewCardScreen/AddNewCardScreen";
import SecurityScreen from "../screens/SecurityScreen/SecurityScreen";
import LanguageScreen from "../screens/LanguageScreen/LanguageScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen/PrivacyPolicyScreen";
import InviteFriendsScreen from "../screens/InviteFriendsScreen/InviteFriendsScreen";
import FilterScreen from "../screens/FilterScreen/FilterScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
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
