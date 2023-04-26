import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IProduct, IResponse } from "../models/IResponse";

const baseUrl = "http://localhost:5005";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Product"],
  endpoints: (build) => ({
    fetchAllProducts: build.query<IResponse<IProduct>, null>({
      query: () => ({
        url: "/products",
      }),
      providesTags: (result) => ["Product"],
      transformResponse: (data: IProduct[]) => {
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
