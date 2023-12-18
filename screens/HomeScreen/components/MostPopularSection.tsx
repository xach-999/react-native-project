import { memo, useState } from "react";
import MostPopularCategories from "./MostPopularCategories";
import MostPopularProducts from "./MostPopularProducts";

const MostPopularSection = ({ navigation }: any) => {
  const [selectedId, setSelectedId] = useState<any>(null);

  return (
    <>
      <MostPopularCategories
        setSelectedId={setSelectedId}
        selectedId={selectedId}
      />
      <MostPopularProducts navigation={navigation} selectedId={selectedId} />
    </>
  );
};

export default memo(MostPopularSection);
