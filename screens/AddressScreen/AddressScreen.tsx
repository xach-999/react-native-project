import { TouchableOpacity, View, StyleSheet } from "react-native";
import HeaderWithGoBack from "../../components/HeaderWithGoBack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { Text } from "react-native";
import MyInput from "../../ui/MyInput";
import { FontAwesome5 } from "@expo/vector-icons";
import MyCheckbox from "../../ui/Checkbox";
import MyButton from "../../ui/MyButton";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import themeContext from "../../context/themeContext";
import * as Location from "expo-location";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Constants from "expo-constants";
import colors from "../../content/colors";

const mapTypes = ["standard", "terrain", "satellite", "hybrid"];

const AddressScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { isDark, eerieBlueOrWhite, whiteOrBlack, sGrayOrLGray } =
    useContext(themeContext);
  const [location, setLocation] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mapType, setMapType] = useState<any>("standard");

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["100%"];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  const mapCustomStyle = useMemo(
    () => [
      {
        elementType: "geometry",
        stylers: [{ color: isDark ? "#1f222a" : "#e7e7e7" }],
      },
      {
        elementType: "labels.text.fill",
        stylers: [{ color: isDark ? "#8c8c8c" : "#ffffff" }],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [{ color: "#1a1a1a" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: isDark ? "#425445" : "#addbb5" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: isDark ? "#425445" : "#addbb5" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: isDark ? "#35383f" : "#ffffff" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: isDark ? "#364358" : "#9cc3ff" }],
      },
    ],
    [isDark]
  );

  const openMapModal = () => {
    sheetRef.current?.snapToIndex(0);
    setIsOpen(true);
  };

  const closeFilterModal = () => {
    sheetRef.current?.close();
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <HeaderWithGoBack
        navigation={navigation}
        title={t("Add New Address")}
        rightIcon={
          <TouchableOpacity onPress={openMapModal}>
            <MaterialCommunityIcons
              name="dots-horizontal-circle-outline"
              size={26}
              color={whiteOrBlack}
            />
          </TouchableOpacity>
        }
      />
      <MapView
        mapType={mapType}
        userInterfaceStyle={isDark ? "dark" : "light"}
        style={styles.map}
        customMapStyle={mapCustomStyle}
        onPress={() => isOpen && closeFilterModal()}
        region={{
          latitude: location?.coords.latitude || 37.78825,
          longitude: location?.coords.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        )}
      </MapView>
      <View style={styles.mapTypeBottonsBlock}>
        {mapTypes.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setMapType(item)}
            style={[
              styles.mapTypeButton,
              {
                backgroundColor:
                  mapType === item
                    ? isDark
                      ? colors.eerieBlue
                      : colors.lightGray
                    : isDark
                    ? colors.slateGray
                    : colors.white,
              },
            ]}
          >
            <Text
              style={{
                color: whiteOrBlack,
                fontWeight: "500",
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setIsOpen(false)}
        enableDynamicSizing={true}
        backgroundStyle={{
          backgroundColor: eerieBlueOrWhite,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <BottomSheetView>
          <View style={{ backgroundColor: eerieBlueOrWhite }}>
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
              <View
                style={[styles.buttonContainer, { borderColor: sGrayOrLGray }]}
              >
                <MyButton text="Add" style={{ flex: 1 }} />
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  mapTypeBottonsBlock: {
    padding: 3,
    position: "absolute",
    top: Constants.statusBarHeight + 64,
    flexDirection: "row",
  },
  mapTypeButton: {
    alignSelf: "center",
    alignContent: "center",
    paddingVertical: 8,
    margin: 1,
    borderRadius: 5,
    width: 70,
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 20,
    fontSize: 22,
    fontWeight: "500",
    borderBottomWidth: 1,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
});

export default AddressScreen;
