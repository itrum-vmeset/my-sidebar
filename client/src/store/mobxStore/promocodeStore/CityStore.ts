import { makeAutoObservable } from "mobx";

import { ICity } from "../../../models/IResponse";
import {
  createCity,
  deleteCity,
  fetchCities,
} from "../../../services/CityServiceM";

class CityStore {
  cities: ICity[] = [];
  activeElement: ICity | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get activeElementM(): ICity | null {
    return this.activeElement;
  }
  setActiveElementM(element: ICity | null): void {
    this.activeElement = element;
  }
  get citiesM(): ICity[] {
    return this.cities;
  }
  setCitiesM(data: ICity[]): void {
    this.cities = data;
  }

  async fetchCitiesM(): Promise<void> {
    try {
      const { data } = await fetchCities();
      this.setCitiesM(data);
    } catch (e) {
      console.log(e);
    }
  }

  async createCityM(city: ICity): Promise<void> {
    try {
      const { data } = await createCity(city);
      this.setCitiesM([...this.cities, data]);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteCityM(city: ICity): Promise<void> {
    try {
      this.setCitiesM(this.cities.filter((item) => item.id !== city.id));
      await deleteCity(city);
    } catch (e) {
      console.log(e);
    }
  }
}
export default new CityStore();
