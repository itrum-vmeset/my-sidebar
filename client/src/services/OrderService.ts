import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IOrder } from "../models/IOrder";
import { IResponse } from "../models/IResponse";

const baseUrl = "http://localhost:5005";

export const orderAPI = createApi({
  reducerPath: "orderAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Order"],
  endpoints: (build) => ({
    fetchAllOrders: build.query<IResponse<IOrder>, null>({
      query: () => ({
        url: "/orders",
      }),
      providesTags: () => ["Order"],
      transformResponse: (data: IOrder[]) => {
        const count = data.length;
        return {
          data,
          count,
        };
      },
    }),
    deleteOrder: build.mutation<IOrder, IOrder>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
    }),
    updateOrder: build.mutation<IOrder, IOrder>({
      query: (order) => ({
        url: `/orders/${order.id}`,
        method: "PUT",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});
