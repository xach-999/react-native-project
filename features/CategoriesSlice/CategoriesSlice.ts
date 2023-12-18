import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorCase, pendingCase } from "../storeHelpers";
import CategoriesService from "../../api/service/categories.service";

export interface initialStateTypes {
  loading: boolean;
  categories: any;
}

const initialState: initialStateTypes = {
  loading: false,
  categories: [],
};

export const getCategories = createAsyncThunk(
  "categoriesSlice/getCategories",
  async () => {
    try {
      const res = await CategoriesService.getCategories();
      return res.data;
    } catch (err) {
      console.log(err);
      return;
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, pendingCase);
    builder.addCase(getCategories.rejected, errorCase);
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload || {};
      state.loading = false;
    });
  },
});

export default categoriesSlice.reducer;
