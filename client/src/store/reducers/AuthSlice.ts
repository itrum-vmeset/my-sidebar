import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../../models/IResponse";

interface AuthState {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  error: string;
  clients: IUser[];
}

const initialState: AuthState = {
  user: {} as IUser,
  isAuth: false,
  isLoading: true,
  error: "",
  clients: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsLoading2(state) {
      state.isLoading = false;
    },
    loginSuccess(state, action: PayloadAction<IUser>) {
      state.error = "";
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
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
    setClients(state, action: PayloadAction<IUser[]>) {
      state.error = "";
      state.clients = action.payload;
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
