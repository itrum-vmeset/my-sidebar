import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IBrand } from "../models/IResponse";

const baseUrl = "http://localhost:5000";

export const brandAPI = createApi({
  reducerPath: "brandAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Brand"],
  endpoints: (build) => ({
    fetchAllBrands: build.query<any, null>({
      query: () => ({
        url: "/brands",
      }),
      providesTags: (result) => ["Brand"],
      transformResponse: (data: any) => {
        const count = data.length;
        return {
          data,
          count,
        };
      },
    }),
    updateBrand: build.mutation<IBrand, IBrand>({
      query: (brand) => ({
        url: `/brands/${brand.id}`,
        method: "PUT",
        body: brand,
      }),
      invalidatesTags: ["Brand"],
    }),
    deleteBrand: build.mutation<IBrand, IBrand>({
      query: (brand) => ({
        url: `/brands/${brand}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});
