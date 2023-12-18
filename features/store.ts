import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import type {TypedUseSelectorHook} from "react-redux";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from "react-redux";

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
