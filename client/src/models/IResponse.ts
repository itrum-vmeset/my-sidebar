export interface IParam {
  page: number;
  limit: number;
}

export interface IBrand {
  id: string;
  name: string;
  icon: string;
}

export interface IProduct {
  id: string;
  name: string;
  nameFrom1C: string;
  codeFrom1C: string;
  price: number;
  volume: string;
  isReady: boolean;
  isRetailAllowed: boolean;
  brand?: IBrand;
  images?: null[] | null;
}

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IResponse<T> {
  data: T[];
}

export interface IUser {
  email: string;
  id: string;
  isActivated: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
