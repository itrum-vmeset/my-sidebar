import axios from "axios";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IComment, IParam, IResponse } from "../models/IResponse";

const baseUrl = "https://jsonplaceholder.typicode.com";

export default class OrderService {
  static async getAll(params: IParam): Promise<any> {
    const url = "https://jsonplaceholder.typicode.com/comments";
    const response = await axios.get(url, {
      params: {
        _page: params.page,
        _limit: params.limit,
      },
    });
    return response;
  }
}

export const orderAPI = createApi({
  reducerPath: "orderAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    fetchAllOrders: build.query<IResponse<IComment>, IParam>({
      query: (params) => ({
        url: "/comments",
        params: {
          _page: params.page,
          _limit: params.limit,
        },
      }),
      transformResponse: (data: IComment[], meta) => {
        return {
          data,
          count: Number(meta?.response?.headers.get("X-Total-Count")),
        };
      },
    }),
  }),
});
