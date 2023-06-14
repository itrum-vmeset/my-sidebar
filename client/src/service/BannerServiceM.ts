import axios, { AxiosResponse } from "axios";

import { IBanner } from "../models/IResponse";

const $host = axios.create({
  baseURL: "http://localhost:5005",
});

export const fetchBanners = async (): Promise<AxiosResponse<IBanner[]>> => {
  const data = await $host.get("/banners");
  return data;
};

export const createBanner = async (
  banner: IBanner
): Promise<AxiosResponse<IBanner>> => {
  const data = await $host.post("/banners", banner);
  return data;
};

export const deleteBanner = async (banner: IBanner): Promise<void> => {
  const data = await $host.delete("/banners/" + banner.id);
};

export const updateBanner = async (
  banner: IBanner
): Promise<AxiosResponse<IBanner>> => {
  const data = await $host.put("/banners/" + banner.id, banner);
  return data;
};
