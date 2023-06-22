import { makeAutoObservable } from "mobx";

import { IOrder } from "../../../models/IOrder";
import {
  deleteOrder,
  fetchOrders,
  updateOrder,
} from "../../../services/OrderServiceM";

class OrderStore {
  orders: IOrder[] = [];
  activeElement: IOrder | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get activeElementM(): IOrder | null {
    return this.activeElement;
  }
  setActiveElementM(element: IOrder | null): void {
    this.activeElement = element;
  }
  get ordersM(): IOrder[] {
    return this.orders;
  }
  setOrdersM(data: IOrder[]): void {
    this.orders = data;
  }

  async fetchOrdersM(): Promise<void> {
    try {
      const { data } = await fetchOrders();
      this.setOrdersM(data);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteOrderM(order: IOrder): Promise<void> {
    try {
      this.setOrdersM(this.orders.filter((item) => item.id !== order.id));
      await deleteOrder(order);
    } catch (e) {
      console.error(e);
    }
  }

  async updateOrderM(order: IOrder): Promise<void> {
    try {
      this.setOrdersM(
        this.orders.map((item) => (item.id === order.id ? order : item))
      );
      await updateOrder(order);
    } catch (e) {
      console.log(e);
    }
  }
}
export default new OrderStore();
