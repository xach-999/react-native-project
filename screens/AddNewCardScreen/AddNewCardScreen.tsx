import { StyleSheet, View } from "react-native";
import HeaderWithGoBack from "../../components/HeaderWithGoBack";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import themeContext from "../../context/themeContext";
import colors from "../../styles/colors";

const AddNewCardScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { eerieBlueOrWhite } = useContext(themeContext);

  return (
    <View style={[styles.constianer, {backgroundColor: eerieBlueOrWhite}]}>
      <HeaderWithGoBack navigation={navigation} title={t("Add New Card")} />
    </View>
  );
};

const styles = StyleSheet.create({
  constianer: {
    flex: 1,
  },
});

export default AddNewCardScreen;
