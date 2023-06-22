import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { ICategory, IResponse } from "../models/IResponse";

const baseUrl = "http://localhost:5005";

export const categoryAPI = createApi({
  reducerPath: "categoryAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Category"],
  endpoints: (build) => ({
    fetchAllCategories: build.query<IResponse<ICategory>, null>({
      query: () => ({
        url: "/categories",
      }),
      providesTags: (result) => ["Category"],
      transformResponse: (data: ICategory[]) => {
        const count = data.length;
        return {
          data,
          count,
        };
      },
    }),
    createCategory: build.mutation<ICategory, ICategory>({
      query: (category) => ({
        url: `/categories/`,
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: build.mutation<ICategory, ICategory>({
      query: (category) => ({
        url: `/categories/${category.id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: build.mutation<ICategory, ICategory>({
      query: (category) => ({
        url: `/categories/${category.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});
