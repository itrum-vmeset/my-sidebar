import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IClient, IResponse } from "../models/IResponse";

const baseUrl = "http://localhost:5005";

export const clientAPI = createApi({
  reducerPath: "clientAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Client"],
  endpoints: (build) => ({
    fetchAllClients: build.query<IResponse<IClient>, null>({
      query: () => ({
        url: "/clients",
      }),
      providesTags: (result) => ["Client"],
      transformResponse: (data: IClient[]) => {
        const count = data.length;
        return {
          data,
          count,
        };
      },
    }),
    updateClient: build.mutation<IClient, IClient>({
      query: (client) => ({
        url: `/clients/${client.email}`,
        method: "PUT",
        body: client,
      }),
      invalidatesTags: ["Client"],
    }),
    deleteClient: build.mutation<IClient, IClient>({
      query: (client) => ({
        url: `/clients/${client}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
    }),
  }),
});
