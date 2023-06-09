import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IProductMock } from "../models/IProductMock";
import { IResponse } from "../models/IResponse";

export const baseUrl = "http://localhost:5005";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Product"],
  endpoints: (build) => ({
    fetchAllProducts: build.query<IResponse<IProductMock>, null>({
      query: () => ({
        url: "/products2",
      }),
      providesTags: () => ["Product"],
      transformResponse: (data: IProductMock[]): IResponse<IProductMock> => {
        const count = data.length;
        return {
          data,
          count,
        };
      },
    }),
    deleteProduct: build.mutation<IProductMock, IProductMock>({
      query: (product) => ({
        url: `/products2/${product.id}`,
        method: "DELETE",
      }),
    }),
    updateProduct: build.mutation<IProductMock, IProductMock>({
      query: (product) => ({
        url: `/products2/${product.id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const { useFetchAllProductsQuery } = productAPI;
