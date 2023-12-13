import React, { memo, useMemo, useState } from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MyInput from "./MyInput";
import { MaterialIcons } from "@expo/vector-icons";

const MyDatePicker = () => {
  const [date, setDate] = useState<any>(new Date("2020-08-17T11:15:30.000Z"));
  const [show, setShow] = useState(false);

  const changedDate = useMemo(() => {
    const dateObject = new Date(date);
    const formatter = new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formatter.format(dateObject);
  }, [date]);

  const onChange = (_: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={showMode}>
        <MyInput
          rightIcon={<MaterialIcons name="date-range" />}
          inputProps={{
            placeholder: "Date",
            type: "default",
            selectTextOnFocus: false,
            value: changedDate,
          }}
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default memo(MyDatePicker);
