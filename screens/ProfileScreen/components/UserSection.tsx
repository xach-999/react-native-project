import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "../../../features/store";
import { FontAwesome } from "@expo/vector-icons";
import themeContext from "../../../context/themeContext";
import colors from "../../../content/colors";

export function UserSection() {
  const { user } = useSelector((state) => state.userSlice);
  const { whiteOrBlack, sGrayOrLGray } = useContext(themeContext);

  return (
    <View style={[styles.container, { borderColor: sGrayOrLGray }]}>
      <View style={styles.userImageContainer}>
        <Image style={styles.userImage} source={{ uri: user.avatar }} />
        <FontAwesome
          style={styles.editIcon}
          name="pencil-square"
          size={27}
          color={whiteOrBlack}
        />
      </View>
      <Text style={[styles.userName, { color: whiteOrBlack }]}>
        {user.name}
      </Text>
      <Text style={[styles.userPhone, { color: whiteOrBlack }]}>
        +1 111 467 378 399
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    rowGap: 8,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    paddingBottom: 15,
    marginHorizontal: 20,
  },
  userImageContainer: {
    position: "relative",
    width: 130,
    height: 130,
  },
  userImage: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  editIcon: {
    position: "absolute",
    right: 3,
    bottom: 3,
  },
  userName: {
    fontWeight: "500",
    fontSize: 22,
  },
  userPhone: {
    fontSize: 13,
    fontWeight: "500",
  },
});
