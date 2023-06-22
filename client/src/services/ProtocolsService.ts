import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IProtocol, IResponse } from "../models/IResponse";

const baseUrl = "http://localhost:5005";

export const protocolAPI = createApi({
  reducerPath: "protocolAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Protocol"],
  endpoints: (build) => ({
    fetchAllProtocols: build.query<IResponse<IProtocol>, string>({
      query: (protocol_category) => ({
        url: "/protocols",
        params: { protocol_category },
      }),
      providesTags: (result) => ["Protocol"],
      transformResponse: (data: IProtocol[]) => {
        const count = data.length;
        return {
          data,
          count,
        };
      },
    }),
    createProtocol: build.mutation<IProtocol, IProtocol>({
      query: (protocol) => ({
        url: `/protocols/`,
        method: "POST",
        body: protocol,
      }),
      invalidatesTags: ["Protocol"],
    }),
    updateProtocol: build.mutation<IProtocol, IProtocol>({
      query: (protocol) => ({
        url: `/protocols/${protocol.id}`,
        method: "PUT",
        body: protocol,
      }),
      invalidatesTags: ["Protocol"],
    }),
    deleteProtocol: build.mutation<IProtocol, IProtocol>({
      query: (protocol) => ({
        url: `/protocols/${protocol.id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["Protocol"],
    }),
  }),
});
