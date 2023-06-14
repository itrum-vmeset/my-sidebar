import { IDelivery } from "../helpers/helpers";

export interface IOrder {
  id: string;
  order_type: string;
  total: number;
  isViewedByAdmin: boolean;
  order_number: string;
  delivery_type: string | IDelivery;
  isPayed: boolean;
  user: User;
  warehouse: Warehouse;
  date: string;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  secondName: string;
  firmName: string;
  role?: string;
}

export interface Warehouse {
  city: string;
}
