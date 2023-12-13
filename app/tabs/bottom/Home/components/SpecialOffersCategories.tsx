import { memo, useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "../../../../../state/store";
import themeContext from "../../../../../context/themeContext";

const SpecialOffersCategories = ({ navigation }: any) => {
  const { categories } = useSelector((state) => state.categoriesSlice);
  const { sGrayOrLGray, whiteOrBlack } = useContext(themeContext);

  const selectCategory = (id: any, name: any) => {
    navigation.navigate("Products For Category", { id, name });
  };

  return (
    <View style={styles.category_blocks}>
      {categories?.map((category: any) => (
        <TouchableOpacity
          key={category.id}
          style={styles.category_block}
          onPress={() => selectCategory(category.id, category.name)}
        >
          <View
            key={category.id}
            style={[
              styles.category_image_block,
              { backgroundColor: sGrayOrLGray },
            ]}
          >
            <Image
              style={styles.category_image}
              source={{ uri: category.image }}
            />
          </View>
          <Text style={[styles.category_title, { color: whiteOrBlack }]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  category_blocks: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 20,
  },
  category_block: {
    alignItems: "center",
    rowGap: 10,
    width: "25%",
  },
  category_image_block: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  category_image: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  category_title: {
    fontWeight: "500",
    fontSize: 15,
  },
});

export default memo(SpecialOffersCategories);
