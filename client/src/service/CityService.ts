import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { ICity, IResponse } from "../models/IResponse";

const baseUrl = "http://localhost:5005";

export const cityAPI = createApi({
  reducerPath: "cityAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["City"],
  endpoints: (build) => ({
    fetchAllCities: build.query<IResponse<ICity>, null>({
      query: () => ({
        url: "/cities",
      }),
      providesTags: (result) => ["City"],
      transformResponse: (data: ICity[]) => {
        const count = data.length;
        return {
          data,
          count,
        };
      },
    }),
    createCity: build.mutation<ICity, ICity>({
      query: (city) => ({
        url: `/cities/`,
        method: "POST",
        body: city,
      }),
      invalidatesTags: ["City"],
    }),
    updateCity: build.mutation<ICity, ICity>({
      query: (city) => ({
        url: `/cities/${city.id}`,
        method: "PUT",
        body: city,
      }),
      invalidatesTags: ["City"],
    }),
    deleteCity: build.mutation<ICity, ICity>({
      query: (city) => ({
        url: `/cities/${city.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["City"],
    }),
  }),
});
