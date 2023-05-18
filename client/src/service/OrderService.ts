import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IOrderMock } from "../models/IOrderMockData";
import { IResponse } from "../models/IResponse";

const baseUrl = "http://localhost:5005";

export const orderAPI = createApi({
  reducerPath: "orderAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Order"],
  endpoints: (build) => ({
    fetchAllOrders: build.query<IResponse<IOrderMock>, null>({
      query: () => ({
        url: "/orders",
      }),
      providesTags: () => ["Order"],
      transformResponse: (data: IOrderMock[]) => {
        const count = data.length;
        return {
          data,
          count,
        };
      },
    }),
    deleteOrder: build.mutation<IOrderMock, IOrderMock>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
    }),
    updateOrder: build.mutation<IOrderMock, IOrderMock>({
      query: (order) => ({
        url: `/orders/${order.id}`,
        method: "PUT",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});
