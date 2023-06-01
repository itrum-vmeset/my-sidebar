import { ReactComponent as BannersIcon } from "../assets/icons/banners.svg";
import { ReactComponent as BrandsIcon } from "../assets/icons/brands.svg";
import { ReactComponent as CategoriesIcon } from "../assets/icons/categories.svg";
import { ReactComponent as CitiesIcon } from "../assets/icons/cities.svg";
import { ReactComponent as OrderIcon } from "../assets/icons/orders.svg";
import { ReactComponent as ProductIcon } from "../assets/icons/products.svg";
import { ReactComponent as PromocodeIcon } from "../assets/icons/promocode.svg";
import { ReactComponent as ProtocolsIcon } from "../assets/icons/protocols.svg";
import { ReactComponent as SeminarsIcon } from "../assets/icons/seminars.svg";
import { ReactComponent as ClientsIcon } from "../assets/icons/users.svg";
import { IMenu } from "../models/IMenu";

import {
  BANNERS_ROUTE,
  BRANDS_ROUTE,
  CATEGORIES_ROUTE,
  CITIES_ROUTE,
  CLIENTS_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  PROMOCODE_ROUTE,
  PROTOCOLS_ROUTE,
  SEMINARS_ROUTE,
} from "./consts";

export const menuItems: IMenu[] = [
  { id: 1, route: PRODUCTS_ROUTE, title: "Продукты", icon: <ProductIcon /> },
  { id: 2, route: CLIENTS_ROUTE, title: "Клиенты", icon: <ClientsIcon /> },
  {
    id: 3,
    route: CATEGORIES_ROUTE,
    title: "Категории",
    icon: <CategoriesIcon />,
  },
  { id: 5, route: BRANDS_ROUTE, title: "Бренды", icon: <BrandsIcon /> },
  { id: 7, route: ORDERS_ROUTE, title: "Заказы", icon: <OrderIcon /> },
  { id: 4, route: CITIES_ROUTE, title: "Города", icon: <CitiesIcon /> },
  {
    id: 6,
    route: PROTOCOLS_ROUTE,
    title: "Протоколы",
    icon: <ProtocolsIcon />,
  },
  { id: 8, route: BANNERS_ROUTE, title: "Баннеры", icon: <BannersIcon /> },
  { id: 9, route: SEMINARS_ROUTE, title: "Семинары", icon: <SeminarsIcon /> },
  {
    id: 10,
    route: PROMOCODE_ROUTE,
    title: "Промокоды",
    icon: <PromocodeIcon />,
  },
];

export const selectOptions = [
  { value: "10", name: "10" },
  { value: "25", name: "25" },
  { value: "50", name: "50" },
];

export const paymentOptions = [
  { value: "ONLINE", name: "Онлайн" },
  { value: "OFFICE_CASH", name: "Наличными в офисе" },
  {
    value: "COURIER_CASH",
    name: "Наличными курьеру",
  },
  {
    value: "OFFICE_TERMINAL",
    name: "Переводом в офисе",
  },
];

export const deliveryOptions = [
  { value: "DELIVERY", name: "Доставка" },
  { value: "PICKUP", name: "Самовывоз" },
];

export const modalData = {
  id: "6ee9ef45-57b1-4372-a3af-5ac3f241b8e1",
  nameFrom1C: "AGT BIO Восстановление и обновление 5мл",
  name: "AGT BIO Восстановление и обновление, 5 мл",
  brand: {
    id: "129b7d00-4a7a-45ed-8eda-d96cbcb52770",
    name: "AGT Bio",
    icon: "0f7fe3e9-98fb-478c-a84d-0883ed245a7d.jpg",
  },
  codeFrom1C: "УТ000001350",
  description:
    "Препарат предназначен для молодой кожи в целях профилактики старения, устранения сухости, увлажнения кожи вокруг глаз, для уменьшения «гусиных лапок», синевы под глазами, повышения иммунного статуса кожи, снятия отечности и пастозности лица, антиоксидантная защита, восстановление кожи после избыточной инсоляции, подготовка и реабилитация после лазерных процедур.\n\nПоказания к применению: Морщины периорбитальной и периоральной зоны, молодая, тонкая и обезвоженная кожа, сниженный тургор, кожа склонная к пастозности, мелкоморщинистый тип старения, ТАЭ, купероз, чувствительная кожа, нарушенный эпидермальный барьер.\n\nСостав: гиалуронат натрия 0,8% (1100-1300 кДа), трегалоза, маннитол, буферный раствор.\n\nСтерильно, апирогенно, нетоксично.",
  images: [
    "https://drive.google.com/uc?export=view&id=1OZcJHRACGwkj4-rE0ZfIoi9ngKUj75_y",
    "https://drive.google.com/uc?export=view&id=16d-yUL2pEo2FLPyTwRHQEPQ6JQYugwnp",
  ],
  price: 2000,
  sub_catalog_product: {
    id: "fcfec920-558b-47ac-81a2-f11d4e7c54a1",
    name: "Биоревитализанты",
    position: 0,
  },
  catalog_product: {
    id: "e0c27048-b304-4e76-8a8e-65ab197d33ad",
    name: "Биорепаранты/биоревитализанты",
    position: 2,
  },
  variations: [],
  characteristics: [
    {
      id: "9033b2fd-a2f4-4ade-9e5e-61e01af7e832",
      key: "Код товара",
      value: "",
    },
    {
      id: "55c30ef0-05c1-48e3-9d55-d31d01f240fd",
      key: "Тип кожи",
      value: "обезвоженная кожа, чувствительная кожа, куперозная кожа",
    },
    {
      id: "c7a605c9-0a23-466a-8dad-27a1b29d3a66",
      key: "Возрасты",
      value: "20+, 30+, 40+, 50+, 60+",
    },
    {
      id: "e0791b37-29b2-4043-b3a3-b8fc4421c237",
      key: "Страна-производитель",
      value: "Россия (Сколково)",
    },
  ],
  tags: [
    {
      id: "45188a94-48cb-4967-8cc6-fe947f6d41c2",
      name: "Восстановление и обновление",
    },
    { id: "0dd83b18-7ded-4a5e-9636-84ef0ce54a38", name: "AGT" },
    { id: "4595df03-d07d-46aa-946e-003b6eb05f5d", name: "AGT BIO" },
  ],
  // estimation: 0,
  // purpose: "Проф",
  // volume: "5 мл",
  // isReady: true,
  // isRetailAllowed: false,
  // product_in_warehouse_info: [
  //   {
  //     id: "ac9a591d-f266-41a8-bc9c-e7a633358ca8",
  //     amount: 14,
  //     prevAmount1C: 14,
  //     warehouseId: "8ccaa361-08c7-4cd1-9f3b-ed79e41acdf2",
  //     productId: "6ee9ef45-57b1-4372-a3af-5ac3f241b8e1",
  //   },
  //   {
  //     id: "9ee316e3-e08b-4ea6-8670-3586b1dd305b",
  //     amount: 5,
  //     prevAmount1C: 5,
  //     warehouseId: "2536a4e3-28c9-4e02-9659-6d14a8865999",
  //     productId: "6ee9ef45-57b1-4372-a3af-5ac3f241b8e1",
  //   },
  //   {
  //     id: "d533b1f2-a4c5-4622-8146-355e7561f62b",
  //     amount: 8,
  //     prevAmount1C: 8,
  //     warehouseId: "817147de-8483-4db0-a717-5cf37064dd27",
  //     productId: "6ee9ef45-57b1-4372-a3af-5ac3f241b8e1",
  //   },
  //   {
  //     id: "81f51554-50c7-4b9e-a7f3-87f12ee69b46",
  //     amount: 22,
  //     prevAmount1C: 22,
  //     warehouseId: "29886e71-764b-4b01-9f07-06eb4ca66a6d",
  //     productId: "6ee9ef45-57b1-4372-a3af-5ac3f241b8e1",
  //   },
  //   {
  //     id: "40b7b8c1-27a7-4a5a-9b2d-9fb2514d66d1",
  //     amount: 1,
  //     prevAmount1C: 1,
  //     warehouseId: "856b7595-a850-45a4-9ed4-6242a4970de1",
  //     productId: "6ee9ef45-57b1-4372-a3af-5ac3f241b8e1",
  //   },
  //   {
  //     id: "8fb2ffb0-5222-4c20-9342-64b7f5331dc0",
  //     amount: 8,
  //     prevAmount1C: 8,
  //     warehouseId: "30c1b2cb-9963-40c3-aad4-8d6b18d35865",
  //     productId: "6ee9ef45-57b1-4372-a3af-5ac3f241b8e1",
  //   },
  //   {
  //     id: "efdc98e0-eee6-4973-a457-6032b1f668bf",
  //     amount: 2,
  //     prevAmount1C: 2,
  //     warehouseId: "5dfad011-a79f-4a8e-bdd2-9572d2a9da34",
  //     productId: "6ee9ef45-57b1-4372-a3af-5ac3f241b8e1",
  //   },
  // ],

  // productRatings: [],
  // estimationCount: 0,

  // similars: [],
  // protocols: [],
  // protocol_categories: [],
  // discount: 0,
  // image:
  //   '["https://drive.google.com/uc?export=view&id=1OZcJHRACGwkj4-rE0ZfIoi9ngKUj75_y","https://drive.google.com/uc?export=view&id=16d-yUL2pEo2FLPyTwRHQEPQ6JQYugwnp"]',
};
