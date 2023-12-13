import { StyleSheet } from "react-native";
import { View } from "react-native";
import React, { memo } from "react";
import { Picker } from "@react-native-picker/picker";
import colors from "../styles/colors";

const MySelect = ({ options }: any) => {
  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
      >
        {options?.map((option: any) => (
          <Picker.Item
            key={option.id}
            label={option.title}
            value={option.title}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteSmoke,
    borderRadius: 12,
    height: 55,
  },
  picker: {
    borderRadius: 12,
  },
});

export default memo(MySelect);
