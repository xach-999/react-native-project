import { memo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";
import MyInput from "../../../../../components/MyInput";

const InputSection = ({ navigation }: any) => {
  const { t } = useTranslation();

  const goToSearchAndFilter = () => {
    navigation.navigate('Search & Filter')
  }

  return (
    <View style={styles.input_block}>
      <TouchableOpacity onPress={goToSearchAndFilter}>
        <MyInput
          leftIcon={<Ionicons name="search-outline" />}
          rightIcon={<Ionicons name="md-filter" />}
          inputProps={{
            placeholder: t("Search"),
            type: "default",
            editable: false,
            selectTextOnFocus: false
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input_block: {
    paddingHorizontal: 20,
    paddingVertical: 45,
  },
});

export default memo(InputSection);