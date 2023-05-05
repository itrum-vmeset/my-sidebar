export interface IParam {
  page: number;
  limit: number;
}

export interface IBrand {
  id: string;
  name: string;
  icon: string;
}

export interface ICategory {
  id: string;
  name: string;
  position: number;
  _id: string;
}

export interface ISubCategory {
  id: string;
  name: string;
  position: number;
  catalog_product: string;
}

export interface IProductFromApi {
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

export interface IClientFromJSONServer {
  email: string | null;
  phone: string | null;
  name: string | null;
  lastName: string | null;
  firmName: string | null;
  role: string | null;
}
