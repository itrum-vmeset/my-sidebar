import { AxiosResponse } from "axios";

import { $authHost, $host } from ".";

interface AuthResponse {
  token: string;
}

export default class AuthService {
  static async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $host.post<AuthResponse>("/user/login", { username, password });
  }

  static async registration(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $host.post<AuthResponse>("/user/registration", {
      username,
      password,
    });
  }

  static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
    return $authHost.get("/user/check");
  }
}
