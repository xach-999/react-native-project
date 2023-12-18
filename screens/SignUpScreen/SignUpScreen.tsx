import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import MyButton from "../../ui/MyButton";
import HeaderWithGoBack from "../../components/HeaderWithGoBack";
import MyInput from "../../ui/MyInput";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextWithLine from "../../components/TextWithLine";
import { socials } from "../../constants/data/data";
import HaveAnAccount from "../../components/HaveAnAccount";
import Checkbox from "../../ui/Checkbox";
import { FontAwesome } from "@expo/vector-icons";
import * as yup from "yup";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Formik } from "formik";
import { useContext, useState } from "react";
import themeContext from "../../context/themeContext";
import colors from "../../content/colors";
import { useTranslation } from "react-i18next";
import RegisterService from "../../api/service/register.service";

interface PropsType {
  navigation: NavigationProp<ParamListBase>;
}

export interface SignUpSubmitDataType {
  name: string;
  email: string;
  password: string;
  rememberMe?: false;
  avatar?: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must contain at least 4 characters"),
});

export default function SignUpScreen(props: PropsType) {
  const { navigation } = props;
  const { t } = useTranslation();
  const { darkBlueOrWhite, whiteOrBlack, eerieBlueOrWhite, sGrayOrLGray } =
    useContext(themeContext);
  const [loading, setLoading] = useState(false);

  const goSignInPage = () => {
    navigation.navigate("Sign In");
  };

  const checkEmptyValues = (values: SignUpSubmitDataType) => {
    return !values.name || !values.email || !values.password;
  };

  const onSubmit = (values: SignUpSubmitDataType) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    setLoading(true);
    RegisterService.registerUser(data)
      .then(() => navigation.navigate("Sign In"))
      .catch((err: any) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <HeaderWithGoBack navigation={navigation} />
      <ScrollView style={styles.scroll_block}>
        <Text style={[styles.text, { color: whiteOrBlack }]}>
          {t("Create your Account")}
        </Text>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            rememberMe: false,
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({ handleChange, setFieldValue, handleSubmit, values, errors }) => (
            <View>
              <View style={styles.inputs_block}>
                <View>
                  <MyInput
                    leftIcon={<FontAwesome name="user" />}
                    inputProps={{
                      placeholder: t("Name"),
                      keyboardType: "default",
                      onChangeText: handleChange("name"),
                      value: values.name,
                    }}
                  />
                  {errors.name && (
                    <Text style={styles.input_error_message}>
                      {errors.name}
                    </Text>
                  )}
                </View>
                <View>
                  <MyInput
                    leftIcon={<MaterialIcons name="email" />}
                    inputProps={{
                      placeholder: t("Email"),
                      keyboardType: "email-address",
                      onChangeText: handleChange("email"),
                      value: values.email,
                    }}
                  />
                  {errors.email && (
                    <Text style={styles.input_error_message}>
                      {errors.email}
                    </Text>
                  )}
                </View>
                <View>
                  <MyInput
                    leftIcon={<MaterialIcons name="lock" />}
                    rightIcon={<MaterialCommunityIcons name="eye-off" />}
                    isPassword={true}
                    inputProps={{
                      placeholder: t("Password"),
                      onChangeText: handleChange("password"),
                      value: values.password,
                    }}
                  />
                  {errors.password && (
                    <Text style={styles.input_error_message}>
                      {errors.password}
                    </Text>
                  )}
                </View>
              </View>
              <Checkbox
                value={values.rememberMe}
                onValueChange={() =>
                  setFieldValue("rememberMe", !values.rememberMe)
                }
                text="Remember me"
              />
              <MyButton
                text="Sign up"
                onPress={handleSubmit}
                disabled={checkEmptyValues(values)}
              />
            </View>
          )}
        </Formik>
        <TextWithLine text="or continue with" style={{ marginTop: 60 }} />
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
            </TouchableOpacity>
          ))}
        </View>
        <HaveAnAccount
          text={"Already have an account?"}
          darkText={"Sign in"}
          onPress={goSignInPage}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll_block: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontSize: 40,
    fontWeight: "600",
    marginTop: 20,
  },
  inputs_block: {
    marginTop: 50,
    rowGap: 20,
  },
  socials_block: {
    columnGap: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  social_block: {
    alignItems: "center",
    borderRadius: 12,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  social_image: {
    width: 25,
    height: 25,
  },
  input_error_message: {
    color: colors.error,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    fontSize: 13,
  },
});
