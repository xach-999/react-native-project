import React, { memo, useContext } from "react";
import colors from "../content/colors";
import SelectDropdown from "react-native-select-dropdown";
import themeContext from "../context/themeContext";

const MySelect = ({ options }: any) => {
  const { isDark } = useContext(themeContext);

  return (
    <SelectDropdown
      buttonTextStyle={{
        textAlign: "left",
        fontSize: 16,
        color: isDark ? colors.white : colors.black,
      }}
      buttonStyle={{
        backgroundColor: isDark ? colors.darkBlue : colors.whiteSmoke,
        width: "100%",
        borderRadius: 12,
        height: 55,
      }}
      data={options}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      buttonTextAfterSelection={(selectedItem) => selectedItem}
      rowTextForSelection={(item) => item}
    />
  );
};

export default memo(MySelect);
