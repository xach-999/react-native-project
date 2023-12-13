import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { errorCase, pendingCase } from "../storeHelpers";
import UserService from "../../services/user.service";
import { database } from "../../db/db";

export type User = {
  id: number | null;
  email: string | null;
  name: string | null;
  role: string | null;
  avatar: string;
};

export interface initialStateTypes {
  loading: boolean;
  user: User;
}

const initialState: initialStateTypes = {
  loading: false,
  user: {} as User,
};

export const getAuthorizedUser = createAsyncThunk(
  "userSlice/getAuthorizedUser",
  async () => {
    try {
      const { _, rows }: any = await database(
        "SELECT access_token FROM token",
        []
      );
      const tokens = rows?.item(0);
      const res = await UserService.getAuthorizedUser(tokens?.access_token);
      return res.data;
    } catch (err) {
      console.log(err);
      return {};
    }
  }
);

export const editUser = createAsyncThunk(
  "userSlice/editUser",
  async (body: any, { getState }) => {
    try {
      const { userSlice }: any = getState();
      const { user } = userSlice
      const res = await UserService.editUser(user.id, body);
      return res.data;
    } catch (err) {
      console.log(err);
      return {};
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logoutUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthorizedUser.pending, pendingCase);
    builder.addCase(editUser.pending, pendingCase);
    builder.addCase(getAuthorizedUser.rejected, errorCase);
    builder.addCase(editUser.rejected, errorCase);
    builder.addCase(
      getAuthorizedUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload || {};
      }
    );
    builder.addCase(
      editUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload || state.user;
      }
    );
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
