import { memo } from "react";
import { Switch} from "react-native";
import colors from "../styles/colors";

const MySwitch = ({value, onValueChange}: any) => {
  return (
    <Switch
      trackColor={{ false: colors.darkGray, true: colors.slateGray }}
      thumbColor={true ? colors.white : colors.lightGray}
      ios_backgroundColor={colors.darkBlue}
      style={{ marginVertical: -20 }}
      onValueChange={onValueChange}
      value={value}
    />
  );
};

export default memo(MySwitch);
