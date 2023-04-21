import axios from "axios";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IParam, IProduct, IProductResponse } from "../models/IResponse";

// const baseUrl = "https://jsonplaceholder.typicode.com";
const baseUrl = "http://localhost:5000";

export default class ProductService {
  static async getAll(params: IParam): Promise<any> {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const response = await axios.get(url, {
      params: {
        _page: params.page,
        _limit: params.limit,
      },
    });
    return response;
  }
}

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Product"],
  endpoints: (build) => ({
    fetchAllProducts: build.query<any, null>({
      query: () => ({
        url: "/products",
      }),
      providesTags: (result) => ["Product"],
      transformResponse: (data: any) => {
        const count = data.length;
        return {
          data,
          count,
        };
      },
    }),
    updateProduct: build.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: build.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `/products/${product}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});
