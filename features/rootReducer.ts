import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./UserSlice/UserSlice";
import categoriesSlice from "./CategoriesSlice/CategoriesSlice";
import filterSlice from "./FilterSlice/FilterSlice";

const rootReducer = combineReducers({
  userSlice,
  categoriesSlice,
  filterSlice,
});

export default rootReducer;