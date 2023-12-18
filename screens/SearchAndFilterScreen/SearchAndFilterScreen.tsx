import React, { useEffect, useState, useCallback, useContext } from "react";
import { View, Text, StyleSheet, RefreshControl } from "react-native";
import { useSelector } from "../../features/store";
import HeaderSection from "./components/HeaderSection";
import Products from "../../components/Products";
import RecentSearches from "./components/RecentSearches";
import { ScrollView } from "react-native-virtualized-view";
import NotFoundSection from "./components/NotFoundSection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../components/Loading";
import { useTranslation } from "react-i18next";
import themeContext from "../../context/themeContext";
import ProductsService from "../../api/service/products.service";

interface SearchAndFilterScreenProps {
  navigation: any;
}

export default function SearchAndFilterScreen({
  navigation,
}: SearchAndFilterScreenProps) {
  const { t } = useTranslation();
  const { eerieBlueOrWhite, whiteOrBlack } = useContext(themeContext);
  const { filterParams } = useSelector((state) => state.filterSlice);

  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [inputActive, setInputActive] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);

  useEffect(() => {
    setInputActive(false);
  }, [products]);

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

  const searchProducts = (text?: any, params?: any) => {
    setLoading(true);
    getProducts(text, params);
  };

  const onRefresh = () => {
    setRefreshLoading(true);
    getProducts();
  };

  const getProducts = (text?: any, params?: any) => {
    const title = text || search;
    if (!title) return;

    const { categoryId, price_min, price_max } = params || filterParams;
    let query = "?";
    if (title) query += `title=${title}&`;
    query += `price_min=${price_min}&price_max=${price_max}`;
    if (categoryId) query += `&categoryId=${categoryId}`;

    saveRecentSearches(title);
    ProductsService.getFilteredProducts(query)
      .then((res: any) => setProducts(res.data))
      .catch((err: any) => console.log(err))
      .finally(() => {
        setLoading(false);
        setRefreshLoading(false);
      });
  };

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <HeaderSection
        navigation={navigation}
        setInputActive={setInputActive}
        searchProducts={searchProducts}
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
              {products?.length} {t("found")}
            </Text>
          </View>

          {!!products?.length ? (
            <ScrollView
              style={styles.results}
              refreshControl={
                <RefreshControl
                  refreshing={refreshLoading}
                  onRefresh={onRefresh}
                />
              }
            >
              <Products products={products} navigation={navigation} />
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
