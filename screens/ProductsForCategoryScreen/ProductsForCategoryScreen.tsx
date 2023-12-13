import React, { useCallback, useContext, useEffect, useState } from "react";
import { RefreshControl, View } from "react-native";
import HeaderWithGoBack from "../../components/HeaderWithGoBack";
import { useRoute } from "@react-navigation/native";
import ProductsService from "../../services/products.service";
import Products from "../../components/Products";
import Loading from "../../components/Loading";
import themeContext from "../../context/themeContext";
import { ScrollView } from "react-native-virtualized-view";

export default function ProductsForCategoryScreen(props: any) {
  const { navigation } = props;
  const route = useRoute();
  const { id, name }: any = route.params;
  const { eerieBlueOrWhite } = useContext(themeContext);
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, [id]);

  const onRefresh = useCallback(() => {
    setRefreshLoading(true);
    getProducts();
  }, []);

  const getProducts = () => {
    let query = "";
    if (id !== null) {
      query += `?categoryId=${id}`;
    }
    ProductsService.getFilteredProducts(query)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        setRefreshLoading(false);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: eerieBlueOrWhite }}>
      <HeaderWithGoBack navigation={navigation} title={name} />

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshLoading} onRefresh={onRefresh} />
          }
        >
          <Products navigation={navigation} products={products} />
        </ScrollView>
      )}
    </View>
  );
}
