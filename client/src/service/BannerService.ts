import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IBanner, IResponse } from "../models/IResponse";

const baseUrl = "http://localhost:5005";

export const bannerAPI = createApi({
  reducerPath: "bannerAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Banner"],
  endpoints: (build) => ({
    fetchAllBanners: build.query<IResponse<IBanner>, null>({
      query: () => ({
        url: "/banners",
      }),
      providesTags: () => ["Banner"],
      transformResponse: (data: IBanner[]): IResponse<IBanner> => {
        const count = data.length;
        return {
          data,
          count,
        };
      },
    }),
    createBanner: build.mutation<IBanner, IBanner>({
      query: (banner) => ({
        url: "/banners",
        method: "POST",
        body: banner,
      }),
      invalidatesTags: ["Banner"],
    }),
    deleteBanner: build.mutation<IBanner, IBanner>({
      query: (banner) => ({
        url: `/banners/${banner.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
    updateBanner: build.mutation<IBanner, IBanner>({
      query: (banner) => ({
        url: `/banners/${banner.id}`,
        method: "PUT",
        body: banner,
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

