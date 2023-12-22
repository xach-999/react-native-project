import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useRef,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  Keyboard,
  TouchableOpacity,
} from "react-native";
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
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import FilterModal from "./components/FiltersModal";

interface SearchAndFilterScreenProps {
  navigation: any;
}

export default function SearchAndFilterScreen({
  navigation,
}: SearchAndFilterScreenProps) {
  const { t } = useTranslation();
  const { eerieBlueOrWhite, whiteOrBlack } = useContext(themeContext);
  const { productMinPrice, productMaxPrice } = useSelector(
    (state) => state.filterSlice
  );

  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [inputActive, setInputActive] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [priceRange, setPriceRange] = useState([
    productMinPrice,
    productMaxPrice,
  ]);

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["100%"];

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

  const onRefresh = () => {
    setRefreshLoading(true);
    getSearchedProducts();
  };

  const searchProducts = (params?: any) => {
    setLoading(true);
    getSearchedProducts(params);
  };

  const getSearchedProducts = (params?: any) => {
    const title = params?.text || search;
    const price_min = params?.rangeData?.[0] || priceRange[0];
    const price_max = params?.rangeData?.[1] || priceRange[1];

    if (!title) return;
    setIsOpen(false);
    sheetRef.current?.close();

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

  const onPressApply = (params: any) => {
    setPriceRange(params.rangeData);
    searchProducts(params);
  };

  const onPressReset = useCallback(() => {
    setCategoryId("");
    setPriceRange([productMinPrice, productMaxPrice]);
  }, []);

  const closeKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const openFilterModal = () => {
    sheetRef.current?.snapToIndex(0);
    setIsOpen(true);
    closeKeyboard();
  };

  const closeFilterModal = () => {
    sheetRef.current?.close();
    setIsOpen(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
        {isOpen && (
          <TouchableOpacity
            onPress={closeFilterModal}
            style={styles.filterBlackPart}
          />
        )}
        <HeaderSection
          navigation={navigation}
          setInputActive={setInputActive}
          searchProducts={searchProducts}
          setSearch={setSearch}
          search={search}
          retrieveRecentSearches={retrieveRecentSearches}
          openFilterModal={openFilterModal}
        />

        {loading ? (
          <Loading />
        ) : inputActive ? (
          <RecentSearches
            recentSearches={recentSearches}
            setRecentSearches={setRecentSearches}
            searchProducts={searchProducts}
            setSearch={setSearch}
            closeKeyboard={closeKeyboard}
          />
        ) : (
          <View style={styles.resultContainer}>
            <View style={styles.headerPart}>
              <Text
                style={[styles.headerPartFirstText, { color: whiteOrBlack }]}
              >
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

      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setIsOpen(false)}
        enableDynamicSizing={true}
        containerHeight={100}
        detached={true}
        backgroundStyle={{
          backgroundColor: eerieBlueOrWhite,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <BottomSheetView>
          <FilterModal
            priceRange={priceRange}
            setCategoryId={setCategoryId}
            categoryId={categoryId}
            onPressReset={onPressReset}
            onPressApply={onPressApply}
          />
        </BottomSheetView>
      </BottomSheet>
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
  filterBlackPart: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.7,
    zIndex: 2,
  },
});
