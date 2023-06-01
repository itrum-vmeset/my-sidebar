import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "../models/IResponse";
import { IFutureSeminar, ISeminar } from "../models/ISeminar";

const baseUrl = "http://localhost:5005";

export const seminarAPI = createApi({
  reducerPath: "seminarAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Seminar"],
  endpoints: (build) => ({
    fetchAllSeminars: build.query<IResponse<IFutureSeminar>, string>({
      query: (query) => ({
        url: `/${query}`,
      }),
      providesTags: () => ["Seminar"],
      transformResponse: (
        data: IFutureSeminar[]
      ): IResponse<IFutureSeminar> => {
        const count = data.length;
        return {
          data,
          count,
        };
      },
    }),
    createSeminar: build.mutation<
      ISeminar,
      { seminar: any; activeRoute: string }
    >({
      query: ({ seminar, activeRoute }) => ({
        url: `/${activeRoute}/`,
        method: "POST",
        body: seminar,
      }),
      invalidatesTags: ["Seminar"],
    }),
    updateSeminar: build.mutation<
      ISeminar,
      { seminar: any; activeRoute: string }
    >({
      query: ({ seminar, activeRoute }) => ({
        url: `/${activeRoute}/${seminar.id}`,
        method: "PUT",
        body: seminar,
      }),
      invalidatesTags: ["Seminar"],
    }),
    deleteSeminar: build.mutation<
      IFutureSeminar,
      { seminar: any; activeRoute: string }
    >({
      query: ({ seminar, activeRoute }) => ({
        url: `/${activeRoute}/${seminar.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Seminar"],
    }),
  }),
});
