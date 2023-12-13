import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import HeaderWithGoBack from "../../components/HeaderWithGoBack";
import MyButton from "../../components/MyButton";
import { useContext, useEffect, useState } from "react";
import UserService from "../../services/user.service";
import Loading from "../../components/Loading";
import { useTranslation } from "react-i18next";
import themeContext from "../../context/themeContext";
import colors from "../../styles/colors";

const InviteFriendsScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { isDark, whiteOrBlack, eerieBlueOrWhite } = useContext(themeContext);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    UserService.getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <HeaderWithGoBack navigation={navigation} title={t("Invite Friends")} />

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={users}
          style={styles.flatList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.userInfoContainer}>
                <Image source={{ uri: item.avatar }} style={styles.userImage} />
                <View style={styles.userInfo}>
                  <Text style={[styles.userName, { color: whiteOrBlack }]}>
                    {item.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[styles.userEmail, { color: whiteOrBlack }]}
                  >
                    {item.email}
                  </Text>
                </View>
              </View>
              <MyButton
                text="Invite"
                style={{
                  ...styles.inviteButton,
                  backgroundColor: isDark ? colors.slateGray : colors.black,
                }}
                textStyle={styles.inviteButtonText}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    flex: 1,
  },
  userImage: {
    borderRadius: 50,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGray,
  },
  userInfo: {
    padding: 8,
    rowGap: 6,
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 16,
  },
  userEmail: {
    fontSize: 15,
    overflow: "hidden",
  },
  inviteButton: {
    paddingVertical: 6,
  },
  inviteButtonText: {
    fontSize: 13,
    color: colors.white,
  },
});

export default InviteFriendsScreen;
