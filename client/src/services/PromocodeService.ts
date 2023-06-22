import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IPromocode, IResponse } from "../models/IResponse";

const baseUrl = "http://localhost:5005";

export const promocodeAPI = createApi({
  reducerPath: "promocodeAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Promocode"],
  endpoints: (build) => ({
    fetchAllPromocodes: build.query<IResponse<IPromocode>, null>({
      query: () => ({
        url: "/promocodes",
      }),
      providesTags: () => ["Promocode"],
      transformResponse: (data: IPromocode[]): IResponse<IPromocode> => {
        const count = data.length;
        return {
          data,
          count,
        };
      },
    }),
    createPromocode: build.mutation<IPromocode, IPromocode>({
      query: (promocode) => ({
        url: "/promocodes",
        method: "POST",
        body: promocode,
      }),
      invalidatesTags: ["Promocode"],
    }),
    deletePromocode: build.mutation<IPromocode, IPromocode>({
      query: (promocode) => ({
        url: `/promocodes/${promocode.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Promocode"],
    }),
    updatePromocode: build.mutation<IPromocode, IPromocode>({
      query: (promocode) => ({
        url: `/promocodes/${promocode.id}`,
        method: "PUT",
        body: promocode,
      }),
      invalidatesTags: ["Promocode"],
    }),
  }),
});
