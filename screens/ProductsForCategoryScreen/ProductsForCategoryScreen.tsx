import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import HeaderWithGoBack from "../../components/HeaderWithGoBack";
import { useRoute } from "@react-navigation/native";
import ProductsService from "../../services/products.service";
import Products from "../../components/Products";
import Loading from "../../components/Loading";
import themeContext from "../../context/themeContext";

export default function ProductsForCategoryScreen(props: any) {
  const { navigation } = props;
  const route = useRoute();
  const { id, name }: any = route.params;
  const { eerieBlueOrWhite } = useContext(themeContext);
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, [id]);

  const getProducts = () => {
    let query = "";
    if (id !== null) {
      query += `?categoryId=${id}`;
    }
    ProductsService.getFilteredProducts(query)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <View style={{ flex: 1, backgroundColor: eerieBlueOrWhite }}>
      <HeaderWithGoBack navigation={navigation} title={name} />

      {loading ? (
        <Loading />
      ) : (
        <Products navigation={navigation} products={products} />
      )}
    </View>
  );
}
