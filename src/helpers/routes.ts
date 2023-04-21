import Brands from "../components/Brand";
import Orders from "../components/Orders";
import Products from "../components/Products";

import { BRANDS_ROUTE, ORDERS_ROUTE, PRODUCTS_ROUTE } from "./consts";

export const publicRoutes = [
  {
    Component: Orders,
    path: ORDERS_ROUTE,
  },
  {
    Component: Products,
    path: PRODUCTS_ROUTE,
  },
  {
    Component: Brands,
    path: BRANDS_ROUTE,
  },
];

export const authRoutes = [];
