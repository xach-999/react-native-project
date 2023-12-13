import React, { memo, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import themeContext from "../../../context/themeContext";
import colors from "../../../styles/colors";

interface RecentSearchesProps {
  recentSearches: string[];
  setRecentSearches: (searches: string[]) => void;
  searchProducts: any;
  setSearch: any;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({
  recentSearches,
  setRecentSearches,
  searchProducts,
  setSearch,
}) => {
  const { t } = useTranslation();
  const { isDark, whiteOrBlack, sGrayOrLGray } = useContext(themeContext);

  const removeSearch = async (index: number) => {
    try {
      const updatedSearches = [...recentSearches];
      updatedSearches.splice(index, 1);
      await AsyncStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedSearches)
      );
      setRecentSearches(updatedSearches);
    } catch (error) {
      console.error("Error removing recent search:", error);
    }
  };

  const clearAllRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem("recentSearches");
      setRecentSearches([]);
    } catch (error) {
      console.error("Error clearing recent searches:", error);
    }
  };

  const selectSearchedText = (text: string) => {
    setSearch(text);
    searchProducts(text);
    closeKeyboard();
  };

  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <View style={styles.container}>
        <View style={[styles.headerPart, { borderColor: sGrayOrLGray }]}>
          <Text style={[styles.headerPartFirstText, { color: whiteOrBlack }]}>
            {t("Recent")}
          </Text>
          <TouchableOpacity onPress={clearAllRecentSearches}>
            <Text
              style={[styles.headerPartSecondText, { color: whiteOrBlack }]}
            >
              {t("Clear All")}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always"
        >
          {recentSearches.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => selectSearchedText(item)}
              style={styles.searchItem}
            >
              <Text
                style={[
                  styles.searchItemText,
                  { color: isDark ? colors.darkGray : colors.eerieGrey },
                ]}
              >
                {item}
              </Text>
              <TouchableOpacity onPress={() => removeSearch(index)}>
                <Ionicons
                  name="close-circle-outline"
                  size={26}
                  color={isDark ? colors.darkGray : colors.eerieGrey}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    marginHorizontal: 20,
    paddingVertical: 15,
  },
  headerPartFirstText: {
    fontWeight: "500",
    fontSize: 18,
  },
  headerPartSecondText: {
    fontWeight: "500",
    fontSize: 15,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
    marginVertical: 6,
  },
  searchItemText: {
    fontSize: 16,
  },
});

export default memo(RecentSearches);
