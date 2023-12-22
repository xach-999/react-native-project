import { Image, StyleSheet, Text, View } from "react-native";
import HeaderWithGoBack from "../../components/HeaderWithGoBack";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import themeContext from "../../context/themeContext";
import MyInput from "../../ui/MyInput";
import MyButton from "../../ui/MyButton";
import { ScrollView } from "react-native-virtualized-view";
import MyDatePicker from "../../ui/MyDatePicker";

const AddNewCardScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { eerieBlueOrWhite, whiteOrBlack, sGrayOrLGray } =
    useContext(themeContext);

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <HeaderWithGoBack navigation={navigation} title={t("Add New Card")} />

      <ScrollView style={{ padding: 20, flex: 1 }}>
        <Image
          style={styles.image}
          source={require("../../assets/credit_card.png")}
        />

        <View style={styles.inputContainer}>
          <Text style={[styles.nameHeader, { color: whiteOrBlack }]}>
            {t("Card Name")}
          </Text>
          <MyInput inputProps={{ value: "Andrew Ainsley" }} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.nameHeader, { color: whiteOrBlack }]}>
            {t("Card Number")}
          </Text>
          <MyInput inputProps={{ value: "2672 4738 7837 7285" }} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            columnGap: 20,
            marginBottom: 40,
            width: "100%",
          }}
        >
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={[styles.nameHeader, { color: whiteOrBlack }]}>
              {t("Expiry Date")}
            </Text>
            <MyDatePicker />
          </View>

          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={[styles.nameHeader, { color: whiteOrBlack }]}>
              {t("CVV")}
            </Text>
            <MyInput inputProps={{ value: "699" }} />
          </View>
        </View>
      </ScrollView>

      <View style={[styles.buttonContainer, { borderColor: sGrayOrLGray }]}>
        <MyButton text="Add" style={{ flex: 1 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    borderRadius: 15,
    height: 200,
  },
  inputContainer: {
    rowGap: 10,
    paddingTop: 15,
    paddingBottom: 5,
  },
  nameHeader: {
    fontWeight: "700",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});

export default AddNewCardScreen;
