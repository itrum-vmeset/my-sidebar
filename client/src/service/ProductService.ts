import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IProductFromApi, IResponse } from "../models/IResponse";

const baseUrl = "http://localhost:5005";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Product"],
  endpoints: (build) => ({
    fetchAllProducts: build.query<IResponse<IProductFromApi>, null>({
      query: () => ({
        url: "/products",
      }),
      providesTags: (result) => ["Product"],
      transformResponse: (data: IProductFromApi[]) => {
        const count = data.length;
        return {
          data,
          count,
        };
      },
    }),
    updateProduct: build.mutation<IProductFromApi, IProductFromApi>({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: build.mutation<IProductFromApi, IProductFromApi>({
      query: (product) => ({
        url: `/products/${product}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});
