import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { ScrollView } from "react-native-virtualized-view";
import MyButton from "../../components/MyButton";
import TextWithLine from "../../components/TextWithLine";
import HaveAnAccount from "../../components/HaveAnAccount";
import { socials } from "../../data/data";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useContext } from "react";
import themeContext from "../../context/themeContext";
import LanguageSection from "./components/LanguageSection";
import DarkModeSection from "./components/DarkModeSection";
import { useTranslation } from "react-i18next";

const generalImage = require("../../assets/lets_you_in_image.png");

interface PropsType {
  navigation: NavigationProp<ParamListBase>;
}

export default function LendingScreen(props: PropsType) {
  const { navigation } = props;
  const { t } = useTranslation();
  const { whiteOrBlack, eerieBlueOrWhite, sGrayOrLGray, darkBlueOrWhite } =
    useContext(themeContext);

  const goSignUpPage = () => {
    navigation.navigate("Sign Up");
  };

  const goSignInPage = () => {
    navigation.navigate("Sign In");
  };

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <ScrollView style={styles.scroll_block}>
        <View style={styles.header_block}>
          <DarkModeSection />
          <LanguageSection />
        </View>
        <View style={styles.image_block}>
          <Image source={generalImage} />
        </View>
        <Text style={[styles.text, { color: whiteOrBlack }]}>
          {t("Let's you in")}
        </Text>
        <View style={styles.socials_block}>
          {socials.map((social) => (
            <TouchableOpacity
              key={social.id}
              style={[
                styles.social_block,
                {
                  backgroundColor: darkBlueOrWhite,
                  borderColor: sGrayOrLGray,
                },
              ]}
            >
              <Image style={styles.social_image} source={social.image} />
              <Text style={[styles.social_text, { color: whiteOrBlack }]}>
                {t(social.text)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextWithLine text="or" />
        <MyButton text="Sign in with password" onPress={goSignInPage} />
        <HaveAnAccount
          text={"Don't have an account?"}
          darkText={"Sign up"}
          onPress={goSignUpPage}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  header_block: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scroll_block: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  image_block: {
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 40,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
  },
  socials_block: {
    rowGap: 15,
    marginTop: 20,
  },
  social_block: {
    alignItems: "center",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  social_image: {
    width: 25,
    height: 25,
  },
  social_text: {
    fontWeight: "500",
    letterSpacing: 0.2,
    marginLeft: 8,
  },
});
