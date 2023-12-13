import React, { memo } from 'react';
import { FlatList, StyleSheet } from "react-native";
import ProductCart from './ProductCart';

const Products = (props: any) => {
  const { products, navigation } = props;

  const selectProduct = (id: any) => {
    navigation.navigate('Product', { id })
  };

  return (
    <FlatList
      data={products}
      style={styles.flatList}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCart 
          product={item} 
          onPressProduct={() => selectProduct(item.id)} 
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  flatList: {
    padding: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  }
});

export default memo(Products);