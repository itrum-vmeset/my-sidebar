import axios, { AxiosResponse } from "axios";

import { ICity } from "../models/IResponse";

const $host = axios.create({
  baseURL: "http://localhost:5005",
});

export const fetchCities = async (): Promise<AxiosResponse<ICity[]>> => {
  const data = await $host.get("/cities");
  return data;
};

export const createCity = async (
  city: ICity
): Promise<AxiosResponse<ICity>> => {
  const data = await $host.post("/cities", city);
  return data;
};

export const deleteCity = async (city: ICity): Promise<void> => {
  const data = await $host.delete("/cities/" + city.id);
};
