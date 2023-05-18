import Auth from "../pages/auth/Auth";
import Brands from "../pages/brands/Brands";
import Categories from "../pages/categories/Categories";
import Cities from "../pages/cities/Cities";
import Clients from "../pages/clients/Clients";
import Orders from "../pages/orders/Orders";
import Products from "../pages/products/Products";
import Protocols from "../pages/protocols/Protocols";

import {
  BRANDS_ROUTE,
  CATEGORIES_ROUTE,
  CITIES_ROUTE,
  CLIENTS_ROUTE,
  LOGIN_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  PROTOCOLS_ROUTE,
  REGISTER_ROUTE,
} from "./consts";

export const publicRoutes = [
  {
    Component: Auth,
    path: LOGIN_ROUTE,
  },
  {
    Component: Auth,
    path: REGISTER_ROUTE,
  },
];

export const authRoutes = [
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
    Component: Clients,
    path: CLIENTS_ROUTE,
  },
  {
    Component: Categories,
    path: CATEGORIES_ROUTE,
  },
  {
    Component: Protocols,
    path: PROTOCOLS_ROUTE,
  },
  {
    Component: Cities,
    path: CITIES_ROUTE,
  },
];
