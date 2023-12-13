import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "../../../../../state/store";
import { database } from "../../../../../db/db";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { logoutUser } from "../../../../../state/UserSlice/UserSlice";
import { useTranslation } from "react-i18next";
import themeContext from "../../../../../context/themeContext";
import MySwitch from "../../../../../components/MySwitch";
import colors from "../../../../../styles/colors";

const data = [
  {
    id: 1,
    title: "Edit Profile",
    type: "link",
    icon: <Ionicons name="person-outline" size={24} />,
  },
  {
    id: 2,
    title: "Address",
    type: "link",
    icon: <MaterialCommunityIcons name="map-marker-outline" size={24} />,
  },
  {
    id: 3,
    title: "Notification",
    type: "link",
    icon: <Ionicons name="md-notifications-outline" size={24} />,
  },
  {
    id: 4,
    title: "Payment",
    type: "link",
    icon: <MaterialIcons name="payment" size={24} />,
  },
  {
    id: 5,
    title: "Security",
    type: "link",
    icon: <MaterialIcons name="security" size={24} />,
  },
  {
    id: 6,
    title: "Language",
    type: "link",
    icon: <MaterialIcons name="language" size={24} />,
  },
  {
    id: 7,
    title: "Dark Mode",
    hideRightIcon: true,
    icon: <Ionicons name="eye-outline" size={24} />,
  },
  {
    id: 8,
    title: "Privacy Policy",
    type: "link",
    icon: <SimpleLineIcons name="lock" size={24} />,
  },
  {
    id: 10,
    title: "Invite Friends",
    type: "link",
    icon: <MaterialCommunityIcons name="human-capacity-increase" size={24} />,
  },
  {
    id: 11,
    title: "Logout",
    hideRightIcon: true,
    icon: <MaterialIcons name="logout" size={24} color={colors.lightRed} />,
  },
];

export function ListSection({ navigation }: any) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { changeMode, isDark, whiteOrBlack } = useContext(themeContext);

  const logout = async () => {
    const { _, rows }: any = await database(
      "SELECT access_token FROM token",
      []
    );
    const tokens = rows?.item(0);
    if (tokens?.access_token) {
      database("delete from token where access_token = ?;", [
        tokens?.access_token,
      ]);
    }
    dispatch(logoutUser());
  };

  const onPressItem = (item: any) => {
    if (item.type === "link") {
      navigation.navigate(item.title);
      return;
    }
    if (item.title === "Logout") {
      logout();
      return;
    }
    if (item.title === "Dark Mode") {
      changeMode();
      return;
    }
  };

  return (
    <FlatList
      data={data}
      style={styles.container}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={[
            styles.itemContainer,
            index === 0 && styles.itemContainerFirst,
          ]}
          onPress={() => onPressItem(item)}
        >
          <View style={styles.itemContent}>
            {item.title === "Logout"
              ? item.icon
              : React.cloneElement(item.icon, { color: whiteOrBlack })}
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.itemText,
                { color: whiteOrBlack },
                item.title === "Logout" && styles.logoutText,
              ]}
            >
              {t(item.title)}
            </Text>
          </View>
          {!item.hideRightIcon && (
            <View style={styles.rightIconContainer}>
              {item.title === "Language" && (
                <Text style={[styles.languageText, { color: whiteOrBlack }]}>
                  {t("active_langauge")}
                </Text>
              )}
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={whiteOrBlack}
              />
            </View>
          )}
          {item.title === "Dark Mode" && (
            <MySwitch value={isDark} onValueChange={changeMode} />
          )}
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    flex: 1,
  },
  itemContainerFirst: {
    marginTop: 15,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
    overflow: "hidden",
    flex: 1,
  },
  logoutText: {
    color: colors.lightRed,
  },
  languageText: {
    fontSize: 16,
    fontWeight: "500",
  },
  rightIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
});
