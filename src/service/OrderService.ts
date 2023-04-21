import axios from "axios";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IComment, ICommentResponse, IParam } from "../models/IResponse";

// const baseUrl = "http://localhost:5000";
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
// { comments: IComment[]; totalCount: number },

export const orderAPI = createApi({
  reducerPath: "orderAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    fetchAllOrders: build.query<{ data: IComment[]; count: number }, IParam>({
      query: (params) => ({
        url: "/comments",
        params: {
          _page: params.page,
          _limit: params.limit,
        },
      }),
      transformResponse: (data: IComment[], meta: any) => {
        return {
          data,
          count: Number(meta.response.headers.get("X-Total-Count")),
        };
      },
    }),
  }),
});
