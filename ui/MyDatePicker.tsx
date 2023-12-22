import React, { memo, useMemo, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import MyInput from "./MyInput";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

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

  const handleConfirm = (date: any) => {
    setDate(date)
  };

  const showDateSelect = () => {
    setShow(true);
  };

  const hideDateSelect = () => {
    setShow(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={showDateSelect}>
        <MyInput
          rightIcon={<MaterialIcons name="date-range" />}
          inputProps={{
            placeholder: "Date",
            type: "default",
            selectTextOnFocus: false,
            value: changedDate,
            pointerEvents: "none",
          }}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDateSelect}
      />
    </View>
  );
};

export default memo(MyDatePicker);
