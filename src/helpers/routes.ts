import Auth from "../pages/auth/Auth";
import Brands from "../pages/brands/Brands";
import Orders from "../pages/orders/Orders";
import Products from "../pages/products/Products";

import {
  BRANDS_ROUTE,
  LOGIN_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  REGISTER_ROUTE,
} from "./consts";

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
  {
    Component: Auth,
    path: LOGIN_ROUTE,
  },
  {
    Component: Auth,
    path: REGISTER_ROUTE,
  },
];

export const authRoutes = [];
