import React, { memo, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import HorizontalFilterMenu from "../../../components/HorizontalFilterMenu";
import themeContext from "../../../context/themeContext";

const ratingItems = [
  { id: 1, name: "All" },
  { id: 2, name: "5" },
  { id: 3, name: "4" },
  { id: 4, name: "3" },
  { id: 5, name: "2" },
  { id: 6, name: "1" },
];

const RatingList = () => {
  const { whiteOrBlack } = useContext(themeContext);
  return (
    <HorizontalFilterMenu
      list={ratingItems}
      leftIcon={<AntDesign name="star" size={15} color={whiteOrBlack} />}
    />
  );
};

export default memo(RatingList);
