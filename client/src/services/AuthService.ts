import axios, { AxiosResponse } from "axios";

import { AuthResponse, IUser } from "../models/IResponse";

import { $authHost, API_URL } from ".";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $authHost.post<AuthResponse>("/auth/login", { email, password });
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $authHost.post<AuthResponse>("/auth/register", {
      email,
      password,
    });
  }

  static async logout(): Promise<void> {
    return $authHost.post("/auth/logout");
  }

  static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
    return axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {
      withCredentials: true,
    });
  }

  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $authHost.get<IUser[]>("/auth/fetch");
  }
}
