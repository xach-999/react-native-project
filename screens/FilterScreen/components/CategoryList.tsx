import React, { memo, useCallback } from 'react';
import { useSelector } from '../../../state/store';
import HorizontalFilterMenu from '../../../components/HorizontalFilterMenu';

const CategoryList = ({categoryId, setCategoryId}: any) => {
  const { categories } = useSelector((state) => state.categoriesSlice);

  const selectCategory = useCallback((id: number) => {
    setCategoryId(id === categoryId ? '' : id);
  }, [categoryId])

  return (
    <HorizontalFilterMenu 
      list={categories} 
      onClick={selectCategory}
      activeId={categoryId}
    />
  );
};

export default memo(CategoryList);
