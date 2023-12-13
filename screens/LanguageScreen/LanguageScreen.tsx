import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderWithGoBack from "../../components/HeaderWithGoBack";
import { useContext, useEffect, useState } from "react";
import MyRadio from "../../components/MyRadio";
import { defaultLanguages } from "../../data/data";
import { useTranslation } from "react-i18next";
import themeContext from "../../context/themeContext";
import {
  changeActiveLanguage,
  changeActiveLanguageFromStorage,
} from "../../helpers/helpers";

const LanguageScreen = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  const { whiteOrBlack, eerieBlueOrWhite } = useContext(themeContext);
  const [languages, setLanguages] = useState<any>(defaultLanguages);

  useEffect(() => {
    changeActiveLanguageFromStorage(languages, setLanguages);
  }, []);

  const onPressLanguage = (index: any) => {
    changeActiveLanguage(languages, setLanguages, index, i18n);
  };

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <HeaderWithGoBack navigation={navigation} title={t("Language")} />

      <FlatList
        data={languages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onPressLanguage(index)}
            style={styles.itemBlock}
          >
            <Text style={[styles.itemTitle, { color: whiteOrBlack }]}>
              {item.title}
            </Text>
            <MyRadio active={item.active} />
          </TouchableOpacity>
        )}
      />
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
    marginVertical: 5,
    height: 48,
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: "500",
  },
});

export default LanguageScreen;
