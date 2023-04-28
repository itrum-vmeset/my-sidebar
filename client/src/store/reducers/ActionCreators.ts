import AuthService from "../../service/AuthService";
import { AppDispatch } from "../store";

import { authSlice } from "./AuthSlice";

export const loginAC =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setIsLoading(true));
      const response = await AuthService.login(email, password);
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch(authSlice.actions.loginSuccess(response.data.user));
    } catch (e: any) {
      dispatch(authSlice.actions.loginError(e.response?.data?.message));
    }
  };

export const checkAC = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.setIsLoading(true));
    const response = await AuthService.checkAuth();
    localStorage.setItem("accessToken", response.data.accessToken);
    dispatch(authSlice.actions.loginSuccess(response.data.user));
  } catch (e: any) {
    dispatch(authSlice.actions.loginError(e.response?.data?.message));
  }
};

export const logoutAC = () => async (dispatch: AppDispatch) => {
  try {
    localStorage.removeItem("accessToken");
    await AuthService.logout();
    dispatch(authSlice.actions.logout());
  } catch (e: any) {
    dispatch(authSlice.actions.loginError(e.response?.data?.message));
  }
};

export const registerAC =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setIsLoading(true));
      const response = await AuthService.registration(email, password);
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch(authSlice.actions.loginSuccess(response.data.user));
    } catch (e: any) {
      dispatch(authSlice.actions.loginError(e.response?.data?.message));
    }
  };

export const fetchAC = () => async (dispatch: AppDispatch) => {
  try {
    // dispatch(authSlice.actions.setIsLoading(true));
    const response = await AuthService.fetchUsers();
    dispatch(authSlice.actions.setClients(response.data));
  } catch (e: any) {
    dispatch(authSlice.actions.loginError(e.response?.data?.message));
  }
};
