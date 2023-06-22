import axios, { AxiosResponse } from "axios";

import { IOrder } from "../models/IOrder";

const $host = axios.create({
  baseURL: "http://localhost:5005",
});

export const fetchOrders = async (): Promise<AxiosResponse<IOrder[]>> => {
  const data = await $host.get("/orders");
  return data;
};

export const deleteOrder = async (order: IOrder): Promise<void> => {
  await $host.delete("/orders/" + order.id);
};

export const updateOrder = async (
  order: IOrder
): Promise<AxiosResponse<IOrder>> => {
  const data = await $host.put("/orders/" + order.id, order);
  return data;
};
