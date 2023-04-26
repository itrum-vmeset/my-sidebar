import jwt_decode from "jwt-decode";

import AuthService from "../../service/AuthService";
import { AppDispatch } from "../store";

import { authSlice } from "./AuthSlice";

interface IUser {
  username: string;
  _id: string;
  role: string;
  iat: number;
  exp: number;
}

export const loginAC =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.login());
      const response = await AuthService.login(username, password);
      localStorage.setItem("token", response.data.token);
      const user = jwt_decode(response.data.token);
      dispatch(authSlice.actions.loginSuccess(user as IUser));
    } catch (e: any) {
      dispatch(authSlice.actions.loginError(e.response?.data?.message));
    }
  };

export const checkAC = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.login());
    const response = await AuthService.checkAuth();
    localStorage.setItem("token", response.data.token);
    const user = jwt_decode(response.data.token);
    dispatch(authSlice.actions.loginSuccess(user as IUser));
  } catch (e: any) {
    dispatch(authSlice.actions.loginError(e.response?.data?.message));
  }
};

export const logoutAC = () => (dispatch: AppDispatch) => {
  try {
    localStorage.removeItem("token");
    dispatch(authSlice.actions.logout());
  } catch (e: any) {
    dispatch(authSlice.actions.loginError(e.response?.data?.message));
  }
};

export const registerAC =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.login());
      const response = await AuthService.registration(username, password);
      localStorage.setItem("token", response.data.token);
      const user = jwt_decode(response.data.token);
      dispatch(authSlice.actions.loginSuccess(user as IUser));
    } catch (e: any) {
      dispatch(authSlice.actions.loginError(e.response?.data?.message));
    }
  };
