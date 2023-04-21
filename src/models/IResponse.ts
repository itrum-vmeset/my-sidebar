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
  brand: IBrand;
  images?: null[] | null;
}

export interface IProductResponse<T> {
  data: T[];
  count: number;
}

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface ICommentResponse<T> {
  data: T[];
}
