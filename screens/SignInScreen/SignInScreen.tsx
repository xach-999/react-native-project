import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import MyButton from "../../components/MyButton";
import HeaderWithGoBack from "../../components/HeaderWithGoBack";
import MyInput from "../../components/MyInput";
import { MaterialIcons } from "@expo/vector-icons";
import TextWithLine from "../../components/TextWithLine";
import HaveAnAccount from "../../components/HaveAnAccount";
import { socials } from "../../data/data";
import Checkbox from "../../components/Checkbox";
import { useDispatch } from "../../state/store";
import * as yup from "yup";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Formik } from "formik";
import { useContext, useState } from "react";
import themeContext from "../../context/themeContext";
import colors from "../../styles/colors";
import { useTranslation } from "react-i18next";
import LoginService from "../../services/login.service";
import { database } from "../../db/db";
import { getAuthorizedUser } from "../../state/UserSlice/UserSlice";

interface PropsType {
  navigation: NavigationProp<ParamListBase>;
}

export interface LoginSubmitDataType {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must contain at least 4 characters"),
});

export default function SignInScreen(props: PropsType) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { whiteOrBlack, eerieBlueOrWhite, sGrayOrLGray, darkBlueOrWhite } =
    useContext(themeContext);
  const [loading, setLoading] = useState(false);

  const goSignUpPage = () => {
    navigation.navigate("Sign Up");
  };

  const checkEmptyValues = (values: LoginSubmitDataType) => {
    return !values.email || !values.password;
  };

  const onSubmit = (values: LoginSubmitDataType) => {
    const body = {
      email: values.email,
      password: values.password,
    };
    setLoading(true)
    LoginService.loginUser(body)
      .then(async (res) => {
        await database(
          "INSERT INTO token (refresh_token, access_token) VALUES (?, ?);",
          [res.data.refresh_token, res.data.access_token]
        );
        dispatch(getAuthorizedUser());
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <HeaderWithGoBack navigation={navigation} />
      <ScrollView style={styles.scroll_block}>
        <Text style={[styles.text, { color: whiteOrBlack }]}>
          {t("Login to your Account")}
        </Text>
        <Formik
          initialValues={{
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
                    isPassword={true}
                    inputProps={{
                      placeholder: t("Password"),
                      keyboardType: "default",
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
                text="Sign in"
                onPress={handleSubmit}
                disabled={checkEmptyValues(values)}
              />
            </View>
          )}
        </Formik>

        <View style={styles.forgot_pas_block}>
          <TouchableOpacity>
            <Text style={[styles.forgot_pas_text, { color: whiteOrBlack }]}>
              {t("Forgot the password?")}
            </Text>
          </TouchableOpacity>
        </View>
        <TextWithLine text="or continue with" />
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
  forgot_pas_block: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  forgot_pas_text: {
    fontWeight: "500",
    textAlign: "center",
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
