import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-virtualized-view";
import { paymentCards } from "../../constants/data/data";
import { useTranslation } from "react-i18next";
import themeContext from "../../context/themeContext";
import HeaderWithGoBack from "../../components/HeaderWithGoBack";
import MyButton from "../../ui/MyButton";

const PaymentScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { eerieBlueOrWhite, whiteOrBlack, darkBlueOrWhite } =
    useContext(themeContext);

  const goAddNewCard = () => {
    navigation.navigate("Add New Card");
  };

  return (
    <View style={[styles.container, { backgroundColor: eerieBlueOrWhite }]}>
      <HeaderWithGoBack
        navigation={navigation}
        title={t("Payment")}
        rightIcon={
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-horizontal-circle-outline"
              size={26}
              color={whiteOrBlack}
            />
          </TouchableOpacity>
        }
      />

      <View style={styles.contentContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.cardsContainer}>
            {paymentCards.map((card, index) => (
              <View
                key={index}
                style={[styles.cardItem, { backgroundColor: darkBlueOrWhite }]}
              >
                <View style={styles.cardItemContent}>
                  <Image source={card.image} style={styles.cardImage} />
                  <Text style={[styles.cardText, { color: whiteOrBlack }]}>
                    {card.title}
                  </Text>
                </View>
                <Text style={[styles.cardText, { color: whiteOrBlack }]}>
                  {t(card.type)}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <MyButton text="Add New Card" onPress={goAddNewCard} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    rowGap: 20,
  },
  cardItem: {
    padding: 20,
    flexDirection: "row",
    borderRadius: 15,
    justifyContent: "space-between",
  },
  cardItemContent: {
    flexDirection: "row",
    columnGap: 10,
  },
  cardImage: {
    width: 23,
    height: 23,
  },
  cardText: {
    fontWeight: "700",
  },
  buttonContainer: {
    padding: 20,
  },
});

export default PaymentScreen;
