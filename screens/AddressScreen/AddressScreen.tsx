import { TouchableOpacity, View, StyleSheet } from "react-native";
import HeaderWithGoBack from "../../components/HeaderWithGoBack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { Text } from "react-native";
import MyInput from "../../components/MyInput";
import { FontAwesome5 } from "@expo/vector-icons";
import MyCheckbox from "../../components/Checkbox";
import MyButton from "../../components/MyButton";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import themeContext from "../../context/themeContext";
import colors from "../../styles/colors";

const AddressScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { eerieBlueOrWhite, whiteOrBlack } = useContext(themeContext);

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <HeaderWithGoBack
        navigation={navigation}
        title={t("Add New Address")}
        rightIcon={
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-horizontal-circle-outline"
              size={26}
              color={whiteOrBlack}
            />
          </TouchableOpacity>
        }
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View style={[styles.content, { backgroundColor: eerieBlueOrWhite }]}>
        <Text
          style={[
            styles.header,
            { color: whiteOrBlack },
            { borderColor: whiteOrBlack },
          ]}
        >
          {t("Address Details")}
        </Text>

        <View style={styles.addressDetails}>
          <View style={styles.inputContainer}>
            <Text style={[styles.nameHeader, { color: whiteOrBlack }]}>
              {t("Name Address")}
            </Text>
            <MyInput
              inputProps={{ value: "Apartment" }}
              style={styles.inputMarginTop}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={[styles.nameHeader, { color: whiteOrBlack }]}>
              {t("Address Details")}
            </Text>
            <MyInput
              rightIcon={<FontAwesome5 name="map-marker-alt" />}
              inputProps={{ value: "2899 Summer Drive Taylor, PC 48180" }}
              style={styles.inputMarginTop}
            />
          </View>
          <MyCheckbox
            style={styles.checkbox}
            text="Make this as the default address"
          />
          <MyButton text="Add" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    flex: 1,
  },
  content: {
    height: "55%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: "-10%",
  },
  header: {
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 22,
    fontWeight: "500",
    borderBottomWidth: 1,
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  addressDetails: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingVertical: 20,
    rowGap: 10,
    marginBottom: 5,
  },
  inputMarginTop: {
    marginTop: 30,
  },
  nameHeader: {
    fontWeight: "700",
    fontSize: 16,
  },
  checkbox: {
    justifyContent: "flex-start",
  },
});

export default AddressScreen;
