import { createSlice } from "@reduxjs/toolkit";

export interface initialStateTypes {
  filterParams: any;
  productMinPrice: number;
  productMaxPrice: number;
}

const initialState: initialStateTypes = {
  filterParams: {
    categoryId: "",
    price_min: 0,
    price_max: 0,
  },
  productMinPrice: 0,
  productMaxPrice: 0,
};

export const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setFilterParams: (state, action) => {
      state.filterParams.categoryId = action.payload?.categoryId || "";
      state.filterParams.price_min = action.payload?.price_min || 0;
      state.filterParams.price_max = action.payload?.price_max || 0;
    },
    setMinMaxPrices: (state, action) => {
      state.productMinPrice = action.payload.min || 0;
      state.productMaxPrice = action.payload.max || 0;
      state.filterParams.price_max = action.payload.max || 0;
      state.filterParams.price_min = action.payload.min || 0;
    },
    resetFilterParams: (state) => {
      state.filterParams = initialState.filterParams;
    },
  },
});

export const { resetFilterParams, setFilterParams, setMinMaxPrices } =
  filterSlice.actions;

export default filterSlice.reducer;
