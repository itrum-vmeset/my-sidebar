import Auth from "../pages/auth/Auth";
import Banners from "../pages/banners/Banners";
import Brands from "../pages/brands/Brands";
import Categories from "../pages/categories/Categories";
import Cities from "../pages/cities/Cities";
import Clients from "../pages/clients/Clients";
import Orders from "../pages/orders/Orders";
import Products from "../pages/products/Products";
import Promocodes from "../pages/promocodes/Promocodes";
import Protocols from "../pages/protocols/Protocols";
import Seminars from "../pages/seminars/Seminars";

import {
  BANNERS_ROUTE,
  BRANDS_ROUTE,
  CATEGORIES_ROUTE,
  CITIES_ROUTE,
  CLIENTS_ROUTE,
  LOGIN_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  PROMOCODE_ROUTE,
  PROTOCOLS_ROUTE,
  REGISTER_ROUTE,
  SEMINARS_ROUTE,
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
  {
    Component: Seminars,
    path: SEMINARS_ROUTE,
  },
  {
    Component: Banners,
    path: BANNERS_ROUTE,
  },
  {
    Component: Promocodes,
    path: PROMOCODE_ROUTE,
  },
];
