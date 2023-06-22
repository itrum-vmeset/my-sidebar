import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IProtocolCategory, IResponse } from "../models/IResponse";

const baseUrl = "http://localhost:5005";

export const protocolCategoriesAPI = createApi({
  reducerPath: "protocolCategoriesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["ProtocolCategories"],
  endpoints: (build) => ({
    fetchAllProtocolCategories: build.query<IResponse<IProtocolCategory>, null>(
      {
        query: () => ({
          url: "/protocolcategories",
        }),
        providesTags: (result) => ["ProtocolCategories"],
        transformResponse: (data: IProtocolCategory[]) => {
          const count = data.length;
          return {
            data,
            count,
          };
        },
      }
    ),
    createProtocolCategory: build.mutation<
      IProtocolCategory,
      IProtocolCategory
    >({
      query: (protocol) => ({
        url: `/protocolcategories/`,
        method: "POST",
        body: protocol,
      }),
      invalidatesTags: ["ProtocolCategories"],
    }),
    updateProtocolCategory: build.mutation<
      IProtocolCategory,
      IProtocolCategory
    >({
      query: (protocolcategory) => ({
        url: `/protocolcategories/${protocolcategory.id}`,
        method: "PUT",
        body: protocolcategory,
      }),
      invalidatesTags: ["ProtocolCategories"],
    }),
    deleteProtocolCategory: build.mutation<
      IProtocolCategory,
      IProtocolCategory
    >({
      query: (protocolcategory) => ({
        url: `/protocolcategories/${protocolcategory.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProtocolCategories"],
    }),
  }),
});
