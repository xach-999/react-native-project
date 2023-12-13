import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { errorCase, pendingCase } from '../storeHelpers';
import ProductsService from '../../services/products.service';

export interface initialStateTypes {
  loading: boolean;
  filteredProducts: any,
  sortAndFilterForm: any,
  searchTitle: any,
  productMinPrice: number,
  productMaxPrice: number,
}

const initialState: initialStateTypes = {
  loading: false,
  filteredProducts: [],
  searchTitle: '',
  sortAndFilterForm: {
    categoryId: '',
    price_min: 0,
    price_max: 0
  },
  productMinPrice: 0,
  productMaxPrice: 0,
}

export const getFilteredProducts = createAsyncThunk(
  "filterSlice/getFilteredProducts",
  async (text: any, { getState }) => {
    try {
      const { filterSlice }: any = getState();
      const { searchTitle, sortAndFilterForm } = filterSlice;
      const { categoryId, price_min, price_max } = sortAndFilterForm;
      const title = text || searchTitle;
      let query = '?';
      if (title) query += `title=${title}&`;
      query += `price_min=${price_min}&price_max=${price_max}`;
      if (categoryId) query += `&categoryId=${categoryId}`;
      const res = await ProductsService.getFilteredProducts(query);
      return res.data;
    } catch (err) {
      console.log(err);
      return;
    }
  }
);

export const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    setSearchTitle: (state, action) => {
      state.searchTitle = action.payload;
    },
    setSortAndFilterForm: (state, action) => {
      state.sortAndFilterForm.categoryId = action.payload?.categoryId || '';
      state.sortAndFilterForm.price_min = action.payload?.price_min || 0;
      state.sortAndFilterForm.price_max = action.payload?.price_max || 0;
    },
    setMinMaxPrices: (state, action) => {
      state.productMinPrice = action.payload.min;
      state.productMaxPrice = action.payload.max;
    },
    resetSortAndFilterForm: (state) => {
      state.sortAndFilterForm = initialState.sortAndFilterForm;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredProducts.pending, pendingCase)
    builder
      .addCase(getFilteredProducts.rejected, errorCase)
    builder
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.filteredProducts = action.payload || {};
        state.loading = false;
      })
  }
})

export const {
  setSearchTitle,
  resetSortAndFilterForm,
  setSortAndFilterForm,
  setMinMaxPrices
} = filterSlice.actions;

export default filterSlice.reducer;