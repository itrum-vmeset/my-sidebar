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

// import { IBrand, ICategory, IProduct, ISubCategory } from "../models/ITable";

export const menuItems: IMenu[] = [
  { id: 1, route: "/products", title: "Продукты", icon: <ProductIcon /> },
  { id: 2, route: "/orders", title: "Заказы", icon: <OrderIcon /> },
  { id: 3, route: "/brands", title: "Бренды", icon: <BrandsIcon /> },
  { id: 6, route: "/clients", title: "Клиенты", icon: <ClientsIcon /> },
  { id: 4, route: "/categories", title: "Категории", icon: <CategoriesIcon /> },
  { id: 5, route: "/cities", title: "Города", icon: <CitiesIcon /> },
  { id: 7, route: "/protocols", title: "Протоколы", icon: <ProtocolsIcon /> },
  { id: 8, route: "/banners", title: "Баннеры", icon: <BannersIcon /> },
  { id: 9, route: "/seminars", title: "Семинары", icon: <SeminarsIcon /> },
  { id: 10, route: "/promocode", title: "Промокоды", icon: <PromocodeIcon /> },
];

// export const brands: IBrand[] = [
//   { brandId: 1, brand: "-" },
//   { brandId: 2, brand: "Academie" },
//   { brandId: 3, brand: "Frolyis Pro" },
//   { brandId: 4, brand: "Kosmoteros Personnel Paris" },
// ];

// export const category: ICategory[] = [
//   { categoryId: 1, category: "-" },
//   { categoryId: 2, category: "Эстетический уход" },
//   { categoryId: 3, category: "Пилинги" },
//   { categoryId: 4, category: "Средства для коррекции фигуры и массажа " },
// ];

// export const subCategory: ISubCategory[] = [
//   { subCategoryId: 1, subCategory: "-" },
//   { subCategoryId: 2, subCategory: "Очищение" },
//   { subCategoryId: 3, subCategory: "Скрабы" },
//   { subCategoryId: 4, subCategory: "Тонизация" },
//   { subCategoryId: 5, subCategory: "Кремы и гели" },
//   { subCategoryId: 6, subCategory: "Кислотные пилинги" },
//   { subCategoryId: 7, subCategory: "Средства для душа" },
// ];

// export const productItems: IProduct[] = [
//   {
//     id: 1,
//     category: category[1],
//     subCategory: subCategory[1],
//     title: "-",
//     cashback: 20,
//     brand: brands[1],
//   },
//   {
//     id: 2,
//     category: category[1],
//     subCategory: subCategory[2],
//     title: "Гоммаж с кремом и витамином У, 50мл",
//     cashback: 10,
//     brand: brands[2],
//   },
//   {
//     id: 3,
//     category: category[1],
//     subCategory: subCategory[3],
//     title: "Нормализующий лосьон, 200мл",
//     cashback: 10,
//     brand: brands[2],
//   },
//   {
//     id: 4,
//     category: category[1],
//     subCategory: subCategory[4],
//     title: "Восстанавливающий уход с кальцием, 50мл",
//     cashback: 15,
//     brand: brands[2],
//   },
//   {
//     id: 5,
//     category: category[3],
//     subCategory: subCategory[5],
//     title: "Ночной пилинг-концентрат “Soin peeling Nuit defruits”, 6мл",
//     cashback: 15,
//     brand: brands[3],
//   },
//   {
//     id: 6,
//     category: category[4],
//     subCategory: subCategory[6],
//     title: "Активный специальный гель для душа с маслом макадамии, 200мл",
//     cashback: 10,
//     brand: brands[4],
//   },
// ];

export const selectOptions = [
  { value: "10", name: "10" },
  { value: "25", name: "25" },
  { value: "50", name: "50" },
  { value: "-1", name: "все" },
];
