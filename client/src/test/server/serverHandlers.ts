import { rest } from "msw";

import { bannersMockData } from "../../pages/banners/BannersMockData";
import { brandsMockData } from "../../pages/brands/BrandsMockData";
import {
  categoriesMockData,
  subCategoriesMockData,
} from "../../pages/categories/CategoriesMockData";
import { citiesMockData } from "../../pages/cities/CitiesMockData";
import { clientsMockData } from "../../pages/clients/ClientsMockData";
import { ordersMockData } from "../../pages/orders/OrdersMockData";
import { productsMockData } from "../../pages/products/ProductsMockData";
import { promocodesMockData } from "../../pages/promocodes/PromocodesMockData";
import {
  protocolCategoriesMockData,
  protocolsMockData,
} from "../../pages/protocols/ProtocolsMockData";
import {
  futureMockData,
  historyMockData,
  requestMockData,
} from "../../pages/seminars/SeminarsMockData";

export const handlers = [
  rest.get("http://localhost:5005/products2", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...productsMockData]));
  }),
  rest.get("http://localhost:5005/promocodes", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...promocodesMockData]));
  }),
  rest.get("http://localhost:5005/brands", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...brandsMockData]));
  }),
  rest.get("http://localhost:5005/categories", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...categoriesMockData]));
  }),
  rest.get("http://localhost:5005/subcategories", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...subCategoriesMockData]));
  }),
  rest.get("http://localhost:5005/clients", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...clientsMockData]));
  }),
  rest.get("http://localhost:5005/banners", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...bannersMockData]));
  }),
  rest.get("http://localhost:5005/cities", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...citiesMockData]));
  }),
  rest.get("http://localhost:5005/orders", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...ordersMockData]));
  }),
  rest.get("http://localhost:5005/future", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...futureMockData]));
  }),
  rest.get("http://localhost:5005/history", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...historyMockData]));
  }),
  rest.get("http://localhost:5005/request", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...requestMockData]));
  }),
  rest.get("http://localhost:5005/protocols", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...protocolsMockData]));
  }),
  rest.get("http://localhost:5005/protocolcategories", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...protocolCategoriesMockData]));
  }),
];
