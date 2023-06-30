import { makeAutoObservable } from "mobx";

import { IBanner } from "../../../models/IResponse";
import {
  createBanner,
  deleteBanner,
  fetchBanners,
  updateBanner,
} from "../../../services/BannerServiceM";

class BannerStore {
  banners: IBanner[] = [];
  activeElement: IBanner | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get activeElementM(): IBanner | null {
    return this.activeElement;
  }
  setActiveElementM(element: IBanner | null): void {
    this.activeElement = element;
  }
  get bannersM(): IBanner[] {
    return this.banners;
  }
  setBannersM(data: IBanner[]): void {
    this.banners = data;
  }

  async fetchBannersM(): Promise<void> {
    try {
      const { data } = await fetchBanners();
      this.setBannersM(data);
    } catch (e) {
      // console.log(e);
    }
  }

  async createBannerM(banner: IBanner): Promise<void> {
    try {
      const { data } = await createBanner(banner);
      this.setBannersM([...this.banners, data]);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteBannerM(banner: IBanner): Promise<void> {
    try {
      this.setBannersM(this.banners.filter((item) => item.id !== banner.id));
      await deleteBanner(banner);
    } catch (e) {
      console.log(e);
    }
  }

  async updateBannerM(banner: IBanner): Promise<void> {
    try {
      this.setBannersM(
        this.banners.map((item) => (item.id === banner.id ? banner : item))
      );
      await updateBanner(banner);
    } catch (e) {
      console.log(e);
    }
  }
}
export default new BannerStore();
