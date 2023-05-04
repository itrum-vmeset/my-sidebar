import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { ICategory, IResponse, ISubCategory } from "../models/IResponse";

const baseUrl = "http://localhost:5000/api";

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
    fetchAllSubCategories: build.query<IResponse<ISubCategory>, string>({
      query: (catalog_product) => ({
        url: "/subcategories",
        params: {catalog_product}
      }),
      transformResponse: (data: ISubCategory[]) => {
        const count = data.length;
        return {
          data,
          count,
        };
      },
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
        url: `/categories/${category}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});
