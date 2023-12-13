import React, { memo, useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MyInput from "../../../components/MyInput";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useDispatch } from "../../../state/store";
import { setSearchTitle } from "../../../state/FilterSlice/FilterSlice";
import themeContext from "../../../context/themeContext";
import { useTranslation } from "react-i18next";

interface HeaderSectionProps {
  navigation: any;
  setInputActive: (active: boolean) => void;
  onSubmitEditing: any;
  setSearch: any;
  search: any;
  retrieveRecentSearches: any;
}

const HeaderSection = (props: HeaderSectionProps) => {
  const {
    navigation,
    setInputActive,
    onSubmitEditing,
    setSearch,
    search,
    retrieveRecentSearches,
  } = props;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { whiteOrBlack } = useContext(themeContext);

  const onChangeText = (value: string) => {
    setSearch(value);
  };

  const clickRightIcon = () => {
    dispatch(setSearchTitle(search));
    navigation.navigate("Filter");
  };

  const goBack = () => {
    navigation?.goBack();
  };

  return (
    <>
      <View style={styles.inputBlock}>
        <TouchableOpacity onPress={goBack}>
          <AntDesign name="arrowleft" size={24} color={whiteOrBlack} />
        </TouchableOpacity>
        <MyInput
          leftIcon={<Ionicons name="search-outline" />}
          rightIcon={<Ionicons name="md-filter" />}
          clickRightIcon={clickRightIcon}
          inputProps={{
            placeholder: t("Search"),
            onSubmitEditing: () => onSubmitEditing(),
            onFocus: () => {
              setInputActive(true);
              retrieveRecentSearches();
            },
            onChangeText: onChangeText,
            value: search,
            autoFocus: true,
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputBlock: {
    marginTop: Constants.statusBarHeight,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
});

export default memo(HeaderSection);