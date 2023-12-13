import Carousel from "react-native-reanimated-carousel";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { carouselData } from "../../../../../data/data";
import { useContext } from "react";
import themeContext from "../../../../../context/themeContext";
import colors from "../../../../../styles/colors";

const width = Dimensions.get("window").width;

export default function SpecialOffersCarousel() {
  const progressValue = useSharedValue<number>(0);
  const { isDark, whiteOrBlack, sGrayOrLGray } = useContext(themeContext);

  const PaginationItem: React.FC<{
    index: number;
    backgroundColor: string;
    length: number;
    animValue: Animated.SharedValue<number>;
  }> = (props) => {
    const { animValue, index, length, backgroundColor } = props;
    const width = 6;

    const animStyle = useAnimatedStyle(() => {
      let inputRange = [index - 1, index, index + 1];
      let outputRange = [-width, 0, width];

      if (index === 0 && animValue?.value > length - 1) {
        inputRange = [length - 1, length, length + 1];
        outputRange = [-width, 0, width];
      }

      return {
        transform: [
          {
            translateX: interpolate(
              animValue?.value,
              inputRange,
              outputRange,
              Extrapolate.CLAMP
            ),
          },
        ],
      };
    }, [animValue, index, length]);

    return (
      <View
        style={{
          backgroundColor: isDark ? colors.eerieBlue : colors.darkGray,
          width,
          height: width,
          borderRadius: 50,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={[
            {
              borderRadius: 50,
              backgroundColor,
              flex: 1,
            },
            animStyle,
          ]}
        />
      </View>
    );
  };

  return (
    <View style={{ marginBottom: 40 }}>
      <Carousel
        loop
        width={width - 40}
        height={200}
        autoPlay={true}
        data={carouselData}
        scrollAnimationDuration={2000}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        pagingEnabled={false}
        renderItem={({ item }: any) => (
          <View style={styles.carousel_item_block}>
            <View
              style={[
                styles.carousel_item,
                { backgroundColor: sGrayOrLGray },
              ]}
            >
              <View style={styles.carousel_item_info}>
                <Text
                  style={[styles.carousel_item_discount, { color: whiteOrBlack }]}
                >
                  {item.discount}%
                </Text>
                <Text
                  style={[styles.carousel_item_title, { color: whiteOrBlack }]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.carousel_item_description,
                    { color: whiteOrBlack },
                  ]}
                >
                  {item.description}
                </Text>
              </View>
              <Image style={styles.carousel_item_image} source={item.image} />
            </View>
          </View>
        )}
      />

      <View style={styles.pagination_block}>
        {carouselData.map((_, index) => {
          return (
            <PaginationItem
              backgroundColor={isDark ? colors.darkGray : colors.black}
              animValue={progressValue}
              index={index}
              key={index}
              length={carouselData.length}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carousel_item_block: {
    height: 170,
    borderRadius: 20,
    paddingLeft: 2,
    paddingRight: 2,
  },
  carousel_item: {
    borderRadius: 20,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    padding: 10,
  },
  carousel_item_image: {
    width: "50%",
    height: "100%",
    marginRight: 10,
    objectFit: "contain",
    borderRadius: 20,
  },
  carousel_item_discount: {
    fontSize: 32,
    fontWeight: "500",
  },
  carousel_item_title: {
    fontSize: 17,
    fontWeight: "500",
    marginVertical: 8,
  },
  carousel_item_description: {
    fontSize: 12,
  },
  carousel_item_info: {
    width: "50%",
    padding: 15,
  },
  pagination_block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: -50,
    columnGap: 5,
  },
});
