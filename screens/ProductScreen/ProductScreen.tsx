import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import HeaderWithGoBack from "../../components/HeaderWithGoBack";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-virtualized-view";
import SizeSection from "./components/SizeSection";
import ColorSection from "./components/ColorSection";
import HeaderSection from "./components/HeaderSection";
import QuantitySection from "./components/QuantitySection";
import PriceSection from "./components/PriceSection";
import ProductsService from "../../services/products.service";
import Loading from "../../components/Loading";
import DescriptionSection from "./components/DescriptionSection";
import themeContext from "../../context/themeContext";

export default function ProductScreen(props: any) {
  const { navigation } = props;
  const route = useRoute();
  const { id }: any = route.params;
  const { sGrayOrLGray, eerieBlueOrWhite } = useContext(themeContext);
  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct();
    return () => setProduct({});
  }, [id]);

  const getProduct = () => {
    ProductsService.getProduct(id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <View style={[styles.container, { backgroundColor: sGrayOrLGray }]}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ImageBackground
            style={styles.imageBackground}
            source={{ uri: product?.images[0] }}
          >
            <HeaderWithGoBack navigation={navigation} />
          </ImageBackground>
          <View
            style={[
              styles.detailsContainer,
              { backgroundColor: eerieBlueOrWhite },
            ]}
          >
            <HeaderSection title={product.title} />
            <ScrollView>
              <View style={{ paddingVertical: 15, rowGap: 15 }}>
                <DescriptionSection description={product.description} />
                <SizeSection />
                <ColorSection />
                <QuantitySection />
              </View>
            </ScrollView>
            <PriceSection price={product.price} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  detailsContainer: {
    height: "55%",
    padding: 20,
  },
  descriptionContainer: {
    marginTop: 15,
  },
});
