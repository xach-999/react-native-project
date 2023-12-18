import { FlatList, StyleSheet, Text, View } from "react-native";
import HeaderWithGoBack from "../../components/HeaderWithGoBack";
import { useContext, useState } from "react";
import { securityListDefault } from "../../constants/data/data";
import { Feather } from "@expo/vector-icons";
import MyButton from "../../ui/MyButton";
import { useTranslation } from "react-i18next";
import themeContext from "../../context/themeContext";
import MySwitch from "../../ui/MySwitch";

const SecurityScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { isDark, eerieBlueOrWhite, whiteOrBlack, sGrayOrLGray } =
    useContext(themeContext);
  const [switcherList, setSwitcherList] = useState(securityListDefault);

  const toggleSwitch = (index: number) => {
    switcherList[index].isEnabled = !switcherList[index].isEnabled;
    setSwitcherList([...switcherList]);
  };

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <HeaderWithGoBack navigation={navigation} title={t("Security")} />

      <View>
        <FlatList
          data={switcherList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.itemBlock}>
              <Text style={[styles.itemTitle, { color: whiteOrBlack }]}>
                {t(item.title)}
              </Text>
              <MySwitch
                onValueChange={() => toggleSwitch(index)}
                value={item.isEnabled}
              />
            </View>
          )}
        />
        <View style={styles.itemBlock}>
          <Text style={[styles.itemTitle, { color: whiteOrBlack }]}>
            {t("Google Authenticator")}
          </Text>
          <Feather name="chevron-right" size={24} color={whiteOrBlack} />
        </View>

        <View style={styles.buttonsContainer}>
          <MyButton
            text="Change PIN"
            style={[styles.button, { backgroundColor: sGrayOrLGray }]}
            textStyle={{ color: whiteOrBlack }}
          />
          <MyButton
            text="Change Password"
            style={[styles.button, { backgroundColor: sGrayOrLGray }]}
            textStyle={{ color: whiteOrBlack}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: "500",
  },
  buttonsContainer: {
    marginTop: 5,
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default SecurityScreen;
