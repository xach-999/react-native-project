import React, { memo } from "react";
import HorizontalFilterMenu from "../../../components/HorizontalFilterMenu";

const sortByItems = [
  {
    id: 1,
    name: "Popular",
  },
  {
    id: 2,
    name: "Most Recent",
  },
  {
    id: 3,
    name: "Price High",
  },
];

const SortByList = () => {
  return (
    <HorizontalFilterMenu list={sortByItems} />
  );
};

export default memo(SortByList);
