import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import themeContext from "../context/themeContext";
import colors from "../content/colors";

export default function ProductCart(props: any) {
  const { product, onPressProduct } = props;
  const { t } = useTranslation();
  const { whiteOrBlack, sGrayOrLGray } = useContext(themeContext);

  return (
    <TouchableOpacity onPress={onPressProduct} style={styles.productItem}>
      <View style={styles.productImageContainer}>
        <View style={styles.productHeartIcon}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: product.images[0] }}
          style={[styles.productImage, { backgroundColor: sGrayOrLGray }]}
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={[styles.productTitle, { color: whiteOrBlack }]}>
          {product.title}
        </Text>
        <View style={styles.productRating}>
          <Ionicons name="md-star" size={22} color={colors.darkGray} />
          <Text style={{ color: whiteOrBlack }}>4.5</Text>
          <Text style={{ color: whiteOrBlack }}>|</Text>
          <View
            style={[styles.productSoldBlock, { backgroundColor: sGrayOrLGray }]}
          >
            <Text style={[styles.productSoldText, { color: whiteOrBlack }]}>
              8.374
            </Text>
            <MaterialCommunityIcons
              name="cart-arrow-up"
              size={15}
              color={whiteOrBlack}
            />
          </View>
        </View>
        <Text style={[styles.productPrice, { color: whiteOrBlack }]}>
          ${product.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productItem: {
    width: "47%",
    marginBottom: 16,
  },
  productImageContainer: {
    borderRadius: 24,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
  },
  productHeartIcon: {
    position: "absolute",
    zIndex: 1,
    padding: 5,
    backgroundColor: colors.black,
    borderRadius: 50,
    top: 8,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    borderRadius: 24,
    height: 170,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    padding: 8,
    rowGap: 5,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 16,
    marginTop: 4,
    marginBottom: 2,
  },
  productRating: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  productSoldBlock: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 3,
  },
  productSoldText: {
    fontSize: 10,
  },
  productPrice: {
    fontSize: 17,
    fontWeight: "700",
  },
});
