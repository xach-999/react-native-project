import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Category from "./Category";
import { useContext } from "react";
import themeContext from "../../../context/themeContext";
import colors from "../../../styles/colors";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
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
        component={Home}
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
        component={Category}
        options={{
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="handbag" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Category}
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
        component={Category}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
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
