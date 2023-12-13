import { memo, useContext } from "react";
import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import themeContext from "../context/themeContext";
import colors from "../styles/colors";

const HorizontalFilterMenu = ({
  list,
  activeId,
  onClick,
  leftIcon,
}: any) => {
  const { isDark } = useContext(themeContext);

  return (
    <FlatList
      horizontal
      data={list}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => onClick && onClick(item.id)}
          style={[
            styles.horizontalList,
            {
              marginLeft: index === 0 ? 20 : 4,
              marginRight: index === list.length - 1 ? 20 : 7,
              borderColor: isDark ? colors.slateGray : colors.black,
              ...(item.id === activeId && {
                backgroundColor: isDark ? colors.slateGray : colors.black,
              }),
            },
          ]}
        >
          {!!leftIcon && leftIcon}
          <Text
            style={[
              styles.horizontalListText,
              {
                color:
                  isDark || item.id === activeId
                    ? colors.white
                    : colors.black,
              },
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  horizontalList: {
    borderWidth: 2,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 16,
    columnGap: 10
  },
  horizontalListText: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16,
  },
});

export default memo(HorizontalFilterMenu);
