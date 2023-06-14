import axios, { AxiosResponse } from "axios";

import { IPromocode } from "../models/IResponse";

const $host = axios.create({
  baseURL: "http://localhost:5005",
});

export const fetchPromocodes = async (): Promise<
  AxiosResponse<IPromocode[]>
> => {
  const data = await $host.get("/promocodes");
  return data;
};

export const createPromocode = async (
  promocode: IPromocode
): Promise<AxiosResponse<IPromocode>> => {
  const data = await $host.post("/promocodes", promocode);
  return data;
};

export const deletePromocode = async (promocode: IPromocode): Promise<void> => {
  const data = await $host.delete("/promocodes/" + promocode.id);
};

export const updatePromocode = async (
  promocode: IPromocode
): Promise<AxiosResponse<IPromocode>> => {
  const data = await $host.put("/promocodes/" + promocode.id, promocode);
  return data;
};
