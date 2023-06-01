import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IResponse, ISubCategory } from "../models/IResponse";

const baseUrl = "http://localhost:5005";

export const subCategoryAPI = createApi({
  reducerPath: "subCategoryAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["SubCategory"],
  endpoints: (build) => ({
    fetchAllSubCategories: build.query<IResponse<ISubCategory>, string>({
      query: (catalog_product) => ({
        url: "/subcategories",
        params: { catalog_product },
      }),
      providesTags: (result) => ["SubCategory"],
      transformResponse: (data: ISubCategory[]) => {
        const count = data.length;
        return {
          data,
          count,
        };
      },
    }),
    createSubCategory: build.mutation<ISubCategory, any>({
      query: (subcategory) => ({
        url: `/subcategories/`,
        method: "POST",
        body: subcategory,
      }),
      invalidatesTags: ["SubCategory"],
    }),
    updateSubCategory: build.mutation<ISubCategory, ISubCategory>({
      query: (subcategory) => ({
        url: `/subcategories/${subcategory.id}`,
        method: "PUT",
        body: subcategory,
      }),
      invalidatesTags: ["SubCategory"],
    }),
    deleteSubCategory: build.mutation<ISubCategory, ISubCategory>({
      query: (subCategory) => ({
        url: `/subcategories/${subCategory}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubCategory"],
    }),
  }),
});
