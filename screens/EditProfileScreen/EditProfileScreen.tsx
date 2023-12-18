import { StyleSheet, Text, View } from "react-native";
import HeaderWithGoBack from "../../components/HeaderWithGoBack";
import { Formik } from "formik";
import MyInput from "../../ui/MyInput";
import MyButton from "../../ui/MyButton";
import { ScrollView } from "react-native-virtualized-view";
import { MaterialIcons } from "@expo/vector-icons";
import PhoneCountryInput from "../../ui/PhoneInput";
import MyDatePicker from "../../ui/MyDatePicker";
import MySelect from "../../ui/MySelect";
import { genderOptions, locationOptions } from "../../constants/data/data";
import { useDispatch, useSelector } from "../../features/store";
import * as yup from "yup";
import Loading from "../../components/Loading";
import { editUser } from "../../features/UserSlice/UserSlice";
import { useTranslation } from "react-i18next";
import colors from "../../content/colors";
import { useContext } from "react";
import themeContext from "../../context/themeContext";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
});

const EditProfileScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { eerieBlueOrWhite } = useContext(themeContext);
  const { user, loading } = useSelector((state) => state.userSlice);

  const onSubmit = (values: any) => {
    dispatch(editUser(values));
  };

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <HeaderWithGoBack navigation={navigation} title={t("Edit Profile")} />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.scroll_Block}>
          <Formik
            initialValues={{
              name: user.name,
              email: user.email,
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={schema}
            onSubmit={onSubmit}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <>
                <View style={styles.inputs_block}>
                  <MyInput
                    inputProps={{
                      placeholder: "Full Name",
                      keyboardType: "default",
                      onChangeText: handleChange("fullname"),
                      value: "Andrew Ainsley",
                    }}
                  />
                  <View>
                    <MyInput
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
                  <MyDatePicker />
                  <View>
                    <MyInput
                      rightIcon={<MaterialIcons name="email" />}
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
                  <MySelect options={locationOptions} />
                  <PhoneCountryInput />
                  <MySelect options={genderOptions} />
                </View>
                <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                  <MyButton text="Update" onPress={handleSubmit} />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll_Block: {
    flex: 1,
  },
  inputs_block: {
    marginHorizontal: 20,
    marginVertical: 30,
    rowGap: 25,
  },
  input_error_message: {
    color: colors.error,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    fontSize: 13,
  },
});

export default EditProfileScreen;
