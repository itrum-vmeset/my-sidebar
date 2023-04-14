import { IMenu } from '../models/IMenu';
import { ReactComponent as ProductIcon } from "../icons/products.svg";
import { ReactComponent as OrderIcon } from "../icons/orders.svg";
import { ReactComponent as ClientsIcon } from "../icons/users.svg";
import { ReactComponent as CategoriesIcon } from "../icons/categories.svg";
import { ReactComponent as CitiesIcon } from "../icons/cities.svg";
import { ReactComponent as BrandsIcon } from "../icons/brands.svg";
import { ReactComponent as ProtocolsIcon } from "../icons/protocols.svg";
import { ReactComponent as BannersIcon } from "../icons/banners.svg";
import { ReactComponent as SeminarsIcon } from "../icons/seminars.svg";
import { ReactComponent as PromocodeIcon } from "../icons/promocode.svg";
import { IBrand, ICategory, IProduct, ISubCategory } from '../models/ITable';

export const menuItems: IMenu[] = [
    { id: 1, route: "/products", title: "Продукты", icon: <ProductIcon /> },
    { id: 2, route: "/orders", title: "Заказы", icon: <OrderIcon /> },
    { id: 3, route: "/clients", title: "Клиенты", icon: <ClientsIcon /> },
    { id: 4, route: "/categories", title: "Категории", icon: <CategoriesIcon /> },
    { id: 5, route: "/cities", title: "Города", icon: <CitiesIcon /> },
    { id: 6, route: "/brands", title: "Бренды", icon: <BrandsIcon /> },
    { id: 7, route: "/protocols", title: "Протоколы", icon: <ProtocolsIcon /> },
    { id: 8, route: "/banners", title: "Баннеры", icon: <BannersIcon /> },
    { id: 9, route: "/seminars", title: "Семинары", icon: <SeminarsIcon /> },
    { id: 10, route: "/promocode", title: "Промокоды", icon: <PromocodeIcon /> },
]

export const brands: IBrand[] = [
    {brandId: 1, brand: '-'},
    {brandId: 2, brand: 'Academie'},
    {brandId: 3, brand: 'Frolyis Pro'},
    {brandId: 4, brand: 'Kosmoteros Personnel Paris'},  
]

export const category: ICategory[] = [
    {categoryId: 1, category: '-'},
    {categoryId: 2, category: 'Эстетический уход'},
    {categoryId: 3, category: 'Пилинги'},
    {categoryId: 4, category: 'Средства для коррекции фигуры и массажа '},
]

export const subCategory: ISubCategory[] = [
    {subCategoryId: 1, subCategory: '-'},
    {subCategoryId: 2, subCategory: 'Очищение'},
    {subCategoryId: 3, subCategory: 'Скрабы'},
    {subCategoryId: 4, subCategory: 'Тонизация'},
    {subCategoryId: 5, subCategory: 'Кремы и гели'},
    {subCategoryId: 6, subCategory: 'Кислотные пилинги'},
    {subCategoryId: 7, subCategory: 'Средства для душа'},
]

export const productItems: IProduct[] = [
    { id: 1, category: category[1], subCategory: subCategory[1], title: '-', cashback: 20, brand: brands[1] },
    { id: 2, category: category[1], subCategory: subCategory[2], title: 'Гоммаж с кремом и витамином У, 50мл', cashback: 10, brand: brands[2] },
    { id: 3, category: category[1], subCategory: subCategory[3], title: 'Нормализующий лосьон, 200мл', cashback: 10, brand: brands[2] },
    { id: 4, category: category[1], subCategory: subCategory[4], title: 'Восстанавливающий уход с кальцием, 50мл', cashback: 15, brand: brands[2] },
    { id: 5, category: category[3], subCategory: subCategory[5], title: 'Ночной пилинг-концентрат “Soin peeling Nuit defruits”, 6мл', cashback: 15, brand: brands[3] },
    { id: 6, category: category[4], subCategory: subCategory[6], title: 'Активный специальный гель для душа с маслом макадамии, 200мл', cashback: 10, brand: brands[4] },
]

export const mockz = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
  ]