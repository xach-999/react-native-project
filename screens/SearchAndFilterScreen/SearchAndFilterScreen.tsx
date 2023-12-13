import React, { useEffect, useState, useCallback, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "../../state/store";

import HeaderSection from "./components/HeaderSection";
import Products from "../../components/Products";
import RecentSearches from "./components/RecentSearches";
import { ScrollView } from "react-native-virtualized-view";
import NotFoundSection from "./components/NotFoundSection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFilteredProducts } from "../../state/FilterSlice/FilterSlice";
import Loading from "../../components/Loading";
import { useTranslation } from "react-i18next";
import themeContext from "../../context/themeContext";

interface SearchAndFilterScreenProps {
  navigation: any;
}

export default function SearchAndFilterScreen({
  navigation,
}: SearchAndFilterScreenProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { eerieBlueOrWhite, whiteOrBlack } = useContext(themeContext);

  const { filteredProducts, loading } = useSelector(
    (state) => state.filterSlice
  );

  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [inputActive, setInputActive] = useState<boolean>(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setInputActive(false);
  }, [filteredProducts]);

  const searchProducts = (text: any) => {
    const searchText = text || search;
    if (!searchText) return;
    setInputActive(false);
    saveRecentSearches(searchText);
    dispatch(getFilteredProducts(searchText));
  };

  const saveRecentSearches = useCallback(
    async (newText: any) => {
      try {
        const updatedSearches = [...recentSearches];
        const searchIndex = updatedSearches.findIndex(
          (item) => item === newText
        );
        if (searchIndex !== -1) {
          updatedSearches.splice(searchIndex, 1);
        }
        updatedSearches.unshift(newText);
        const limitedSearches = updatedSearches.slice(0, 20);
        await AsyncStorage.setItem(
          "recentSearches",
          JSON.stringify(limitedSearches)
        );
        setRecentSearches(limitedSearches);
      } catch (error) {
        console.error("Error saving recent searches:", error);
      }
    },
    [recentSearches]
  );

  const retrieveRecentSearches = useCallback(async () => {
    try {
      const storedSearches = await AsyncStorage.getItem("recentSearches");
      if (storedSearches) {
        const parsedSearches = JSON.parse(storedSearches) as string[];
        setRecentSearches(parsedSearches);
      }
    } catch (error) {
      console.error("Error retrieving recent searches:", error);
    }
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <HeaderSection
        navigation={navigation}
        setInputActive={setInputActive}
        onSubmitEditing={searchProducts}
        setSearch={setSearch}
        search={search}
        retrieveRecentSearches={retrieveRecentSearches}
      />

      {loading ? (
        <Loading />
      ) : inputActive ? (
        <RecentSearches
          recentSearches={recentSearches}
          setRecentSearches={setRecentSearches}
          searchProducts={searchProducts}
          setSearch={setSearch}
        />
      ) : (
        <View style={styles.resultContainer}>
          <View style={styles.headerPart}>
            <Text style={[styles.headerPartFirstText, { color: whiteOrBlack }]}>
              {t("Results for")} "{search}"
            </Text>
            <Text
              style={[styles.headerPartSecondText, { color: whiteOrBlack }]}
            >
              {filteredProducts?.length} {t("found")}
            </Text>
          </View>

          {!!filteredProducts?.length ? (
            <ScrollView style={styles.results}>
              <Products products={filteredProducts} navigation={navigation} />
            </ScrollView>
          ) : (
            <NotFoundSection />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerPart: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  resultContainer: {
    flex: 1,
  },
  results: {
    flex: 1,
  },
});
