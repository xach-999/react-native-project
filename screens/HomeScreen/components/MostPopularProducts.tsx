import { memo, useEffect, useState } from "react";
import { View } from "react-native";
import ProductsService from "../../../api/service/products.service";
import Products from "../../../components/Products";
import Loading from "../../../components/Loading";
import { useDispatch } from "../../../features/store";
import { setMinMaxPrices } from "../../../features/FilterSlice/FilterSlice";

const MostPopularProducts = ({ navigation, selectedId }: any) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
    setLoading(true);
  }, [selectedId]);

  const getProducts = () => {
    let query = '';
    if (selectedId !== null) {
      query += `?categoryId=${selectedId}`;
    }
    ProductsService.getFilteredProducts(query)
    .then((res: any) => {
      const allProducts = [ ...res.data ];
      allProducts.sort((a: any, b: any) => a?.price - b?.price);
      const min = allProducts[0]?.price || 0;
      const max = allProducts[allProducts.length - 3]?.price || 0;
      dispatch(setMinMaxPrices({min, max}))
      setProducts(res.data)
    })
    .catch((err: any) => console.log(err))
    .finally(() => setLoading(false));
  };

  return (
    <>
      {loading ? (
        <View style={{height: 250}}>
          <Loading />
        </View>
      ) : (
        <Products navigation={navigation} products={products} />
      )}
    </>
  )
}

export default memo(MostPopularProducts);