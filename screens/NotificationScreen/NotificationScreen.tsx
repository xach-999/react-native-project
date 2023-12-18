import { FlatList, StyleSheet, View } from "react-native";
import HeaderWithGoBack from "../../components/HeaderWithGoBack";
import { useContext, useState } from "react";
import { Text } from "react-native";
import { notificationListDefault } from "../../constants/data/data";
import { useTranslation } from "react-i18next";
import themeContext from "../../context/themeContext";
import MySwitch from "../../ui/MySwitch";

const NotificationScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { whiteOrBlack, eerieBlueOrWhite } = useContext(themeContext);
  const [switcherList, setSwitcherList] = useState(notificationListDefault);

  const toggleSwitch = (index: number) => {
    switcherList[index].isEnabled = !switcherList[index].isEnabled;
    setSwitcherList([...switcherList]);
  };

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <HeaderWithGoBack navigation={navigation} title={t("Notification")} />

      <FlatList
        data={switcherList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item_block}>
            <Text style={[styles.item_title, { color: whiteOrBlack }]}>
              {t(item.title)}
            </Text>
            <MySwitch
              onValueChange={() => toggleSwitch(index)}
              value={item.isEnabled}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item_block: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  item_title: {
    fontSize: 17,
    fontWeight: "500",
  },
});

export default NotificationScreen;
