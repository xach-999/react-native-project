import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CountryFlag from "react-native-country-flag";
import { useTranslation } from "react-i18next";
import themeContext from "../../../context/themeContext";
import {
  changeActiveLanguage,
  changeActiveLanguageFromStorage,
} from "../../../helpers/helpers";
import { defaultLanguages } from "../../../data/data";
import colors from "../../../styles/colors";

const LanguageSection = () => {
  const { i18n } = useTranslation();
  const { isDark, whiteOrBlack, sGrayOrLGray, darkBlueOrWhite } =
    useContext(themeContext);

  const [showLanguages, setShowLanguages] = useState(false);
  const [languages, setLanguages] = useState(defaultLanguages);

  const activeLanguage: any = useMemo(() => {
    return languages.find((item) => item.active);
  }, [languages]);

  useEffect(() => {
    changeActiveLanguageFromStorage(languages, setLanguages);
  }, []);

  const onPressLanguage = (index: any) => {
    changeActiveLanguage(languages, setLanguages, index, i18n);
    setShowLanguages(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowLanguages(!showLanguages)}
        style={styles.languageButton}
      >
        <View style={styles.languageContainer}>
          {/* <Text style={[styles.languageText, { color: whiteOrBlack }]}>
            {activeLanguage?.value.toUpperCase()}
          </Text> */}
          <CountryFlag
            size={14}
            isoCode={
              activeLanguage?.value === "en" ? "gb" : activeLanguage.value
            }
          />
        </View>
        <FontAwesome
          size={20}
          name={showLanguages ? "angle-up" : "angle-down"}
          color={whiteOrBlack}
        />
      </TouchableOpacity>
      {showLanguages && (
        <View
          style={[
            styles.languageListContainer,
            {
              backgroundColor: darkBlueOrWhite,
              borderColor: sGrayOrLGray,
            },
          ]}
        >
          {languages.map((item, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                onPress={() => onPressLanguage(index)}
                style={styles.languageListItem}
              >
                <Text style={[styles.languageText, { color: whiteOrBlack }]}>
                  {item.value.toUpperCase()}
                </Text>
                <CountryFlag
                  isoCode={item.value === "en" ? "gb" : item.value}
                  size={16}
                />
              </TouchableOpacity>
              {index < languages.length - 1 && (
                <View
                  style={[
                    styles.separator,
                    {
                      backgroundColor: isDark
                        ? colors.slateGray
                        : colors.lightGray,
                    },
                  ]}
                />
              )}
            </React.Fragment>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    columnGap: 5,
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  languageText: {
    fontSize: 13,
    fontWeight: "500",
  },
  languageListContainer: {
    position: "absolute",
    borderWidth: 1,
    padding: 10,
    top: 35,
    right: 0,
    zIndex: 2,
    borderRadius: 5,
    rowGap: 5,
    width: 70,
  },
  languageListItem: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    justifyContent: "flex-end",
  },
  separator: {
    width: "100%",
    height: 1,
  },
});

export default memo(LanguageSection);
