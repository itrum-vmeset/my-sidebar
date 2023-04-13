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