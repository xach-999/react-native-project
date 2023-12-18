import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { memo, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "../../../features/store";
import themeContext from "../../../context/themeContext";
import colors from "../../../content/colors";

const handImage = require("../../../assets/hand.png");

const HomeScreenHeader = () => {
  const { user } = useSelector((state) => state.userSlice);
  const { t } = useTranslation();
  const { isDark, whiteOrBlack } = useContext(themeContext);

  return (
    <View style={styles.container}>
      <View style={styles.left_part}>
        <Image style={styles.user_image} source={{ uri: user.avatar }} />
        <View>
          <View style={styles.good_morning_block}>
            <Text
              style={{ color: isDark ? colors.lightGray : colors.eerieGrey }}
            >
              {t("Good Morning")}
            </Text>
            <Image style={styles.hand_image} source={handImage} />
          </View>
          <Text style={[styles.user_name, { color: whiteOrBlack }]}>
            {user.name}
          </Text>
        </View>
      </View>
      <View style={styles.right_part}>
        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={26}
            color={whiteOrBlack}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={26} color={whiteOrBlack} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  user_image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  left_part: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
  },
  right_part: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
  },
  hand_image: {
    width: 17,
    height: 17,
  },
  good_morning_block: {
    flexDirection: "row",
    columnGap: 3,
    alignItems: "center",
  },
  user_name: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default memo(HomeScreenHeader);
