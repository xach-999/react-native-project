import React, { memo, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import PhoneInput from "react-native-phone-input";
import CountryPicker from "react-native-country-picker-modal";
import colors from "../content/colors";
import themeContext from "../context/themeContext";

const PhoneCountryInput = () => {
  const { isDark } = useContext(themeContext);
  const [phoneNumber, setPhoneNumber] = useState<any>("+37477777777");
  const [countryCode, setCountryCode] = useState<any>("AM");
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const onSelectCountry = (country: any) => {
    setCountryCode(country.cca2);
    setSelectedCountry(country);
    setCountryPickerVisible(false);
  };

  const toggleCountryPicker = () => {
    setCountryPickerVisible(!countryPickerVisible);
  };

  return (
    <View style={styles.container}>
      <PhoneInput
        value={phoneNumber}
        defaultCode={countryCode}
        onChangePhoneNumber={(number) => setPhoneNumber(number)}
        onPressFlag={toggleCountryPicker}
        style={[
          styles.phoneInput,
          { backgroundColor: isDark ? colors.darkBlue : colors.whiteSmoke },
        ]}
      />
      {countryPickerVisible && (
        <CountryPicker
          withFilter={true}
          withFlagButton={false}
          withCountryNameButton={false}
          onSelect={onSelectCountry}
          onClose={() => setCountryPickerVisible(false)}
          visible={countryPickerVisible}
          containerButtonStyle={styles.countryPickerButton}
          closeButtonImageStyle={styles.countryPickerCloseButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  phoneInput: {
    height: 55,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: colors.whiteSmoke,
    borderRadius: 12,
  },
  countryPickerButton: {
    borderRadius: 5,
    marginBottom: 20,
  },
  countryPickerCloseButton: {
    width: 20,
    height: 20,
  },
});

export default memo(PhoneCountryInput);
