import { memo } from "react";
import HorizontalFilterMenu from "../../../../../components/HorizontalFilterMenu";
import { useSelector } from "../../../../../state/store";

const MostPopularCategories = ({ setSelectedId, selectedId }: any) => {
  const { categories } = useSelector((state) => state.categoriesSlice);

  return (
    <HorizontalFilterMenu
      list={categories}
      activeId={selectedId}
      onClick={setSelectedId}
    />
  );
};

export default memo(MostPopularCategories);
