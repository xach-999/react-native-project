import { View, FlatList, Text, StyleSheet } from "react-native";
import HeaderWithGoBack from "../../components/HeaderWithGoBack";
import { PrivacyPolicyData } from "../../data/data";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import themeContext from "../../context/themeContext";

const PrivacyPolicyScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { whiteOrBlack, eerieBlueOrWhite } = useContext(themeContext);

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <HeaderWithGoBack navigation={navigation} title={t("Privacy Policy")} />

      <FlatList
        data={PrivacyPolicyData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item_block}>
            <Text style={[styles.item_title, { color: whiteOrBlack }]}>
              {t(item.title)}
            </Text>
            <Text style={[styles.item_description, { color: whiteOrBlack }]}>
              {t(item.description)}
            </Text>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  item_title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 15,
  },
  item_description: {
    fontSize: 13
  },
});

export default PrivacyPolicyScreen;
