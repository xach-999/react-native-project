import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import CategoryScreen from "../screens/CategoryScreen/CategoryScreen";
import themeContext from "../context/themeContext";
import colors from "../content/colors";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { whiteOrBlack } = useContext(themeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: whiteOrBlack,
        tabBarInactiveTintColor: colors.eerieGrey,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons
                name="home-outline"
                color={color}
                size={28}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="handbag" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cart-outline"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={28}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
