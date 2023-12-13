import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { HeaderSection } from "./components/HeaderSection";
import { UserSection } from "./components/UserSection";
import { ListSection } from "./components/ListSection";
import { useContext } from "react";
import themeContext from "../../../../context/themeContext";

export default function Profile({ navigation }: any) {
  const { eerieBlueOrWhite } = useContext(themeContext);

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <HeaderSection />
      <UserSection />

      <View style={{ flex: 1 }}>
        <ListSection navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
