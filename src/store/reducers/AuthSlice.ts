import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../../models/IResponse";

interface AuthState {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  user: {} as IUser,
  isAuth: false,
  isLoading: true,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
      state.isAuth = true;
    },
    loginError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.error = "";
      state.user = {} as IUser;
      state.isAuth = false;
    },
  },
});

export default authSlice.reducer;
