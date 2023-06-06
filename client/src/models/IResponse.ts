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
  count: number;
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

export interface IProtocolCategory {
  id: string;
  name: string;
}

export interface IProtocol {
  id: string;
  name: string;
  description: string;
  isRetailAllowed: boolean;
  brand: IBrand;
  protocol_category: IProtocolCategory;
  products: IProductFromApi[];
}

export interface ICity {
  id: string;
  name: string;
  address: string;
}

export interface IBanner {
  createdAt?: string;
  updatedAt?: string;
  id: string;
  name: string;
  description: string;
  percent: number;
  image: string;
  mobileImage?: string;
  availableFor: string;
  type?: string;
  promocode?: IPromocode;
  products: Product[];
}

export interface IPromocode {
  id: string;
  name: string;
  promocode: string;
  percent: number;
  catalog_product: CatalogProduct;
  brand: Brand;
  products: Product[];
  sub_catalog_product: SubCatalogProduct;
}

export interface CatalogProduct {
  id: string;
  name: string;
  position?: number;
  __v?: number;
}

export interface Brand {
  id: string;
  name: string;
  icon?: string;
  margin?: number;
}

export interface Product {
  id: string;
  name: string;
  isRetailAllowed: boolean;
  brand: Brand;
  images: any[];
}

export interface SubCatalogProduct {
  id: string;
  name: string;
  position?: number;
  catalog_product: string;
  __v?: number;
}
