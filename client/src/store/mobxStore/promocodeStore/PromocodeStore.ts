import { makeAutoObservable } from "mobx";

import { IPromocode } from "../../../models/IResponse";
import {
  createPromocode,
  deletePromocode,
  fetchPromocodes,
  updatePromocode,
} from "../../../service/PromocodeServiceM";

class PromocodeStore {
  promocodes: IPromocode[] = [];
  activeElement: IPromocode | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get activeElementM(): IPromocode | null {
    return this.activeElement;
  }
  setActiveElementM(element: IPromocode | null): void {
    this.activeElement = element;
  }
  get promocodesM(): IPromocode[] {
    return this.promocodes;
  }
  setPromocodesM(data: IPromocode[]): void {
    this.promocodes = data;
  }

  async fetchPromocodesM(): Promise<void> {
    try {
      const { data } = await fetchPromocodes();
      this.setPromocodesM(data);
    } catch (e) {
      console.log(e);
    }
  }

  async createPromocodeM(promocode: IPromocode): Promise<void> {
    try {
      const { data } = await createPromocode(promocode);
      this.setPromocodesM([...this.promocodes, data]);
    } catch (e) {
      console.log(e);
    }
  }

  async deletePromocodeM(promocode: IPromocode): Promise<void> {
    try {
      this.setPromocodesM(
        this.promocodes.filter((item) => item.id !== promocode.id)
      );
      await deletePromocode(promocode);
    } catch (e) {
      console.log(e);
    }
  }

  async updatePromocodeM(promocode: IPromocode): Promise<void> {
    try {
      this.setPromocodesM(
        this.promocodes.map((item) =>
          item.id === promocode.id ? promocode : item
        )
      );
      await updatePromocode(promocode);
    } catch (e) {
      console.log(e);
    }
  }
}
export default new PromocodeStore();
