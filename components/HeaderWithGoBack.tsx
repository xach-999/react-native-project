import { Text, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Constants from "expo-constants";
import { useContext } from "react";
import themeContext from "../context/themeContext";

interface PropsType {
  navigation?: NavigationProp<ParamListBase>;
  title?: string;
  callBackGoBack?: any;
  style?: any;
  rightIcon?: any;
}

export default function HeaderWithGoBack(props: PropsType) {
  const { navigation, callBackGoBack, title, style, rightIcon } = props;
  const { whiteOrBlack } = useContext(themeContext);

  const goBack = () => {
    callBackGoBack && callBackGoBack();
    navigation?.goBack();
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleWithBackIconBlock}>
        <TouchableOpacity onPress={goBack}>
          <AntDesign name="arrowleft" size={24} color={whiteOrBlack} />
        </TouchableOpacity>
        {!!title && (
          <Text style={[styles.title, { color: whiteOrBlack }]}>{title}</Text>
        )}
      </View>
      {rightIcon && rightIcon}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: Constants.statusBarHeight,
    justifyContent: "space-between",
  },
  titleWithBackIconBlock: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    paddingHorizontal: 20,
    fontWeight: "500",
  },
});
