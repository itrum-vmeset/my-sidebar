export interface IOrderMock {
  id: string;
  order_type: string;
  total: number;
  isViewedByAdmin: boolean;
  order_number: string;
  delivery_type: string;
  isPayed: boolean;
  user: User;
  warehouse: Warehouse;
  date: string;
}

export interface User {
  id: string;
  name: string;
  lastName: any;
  secondName: any;
  firmName: any;
  role: string;
}

export interface Warehouse {
  city: string;
}
