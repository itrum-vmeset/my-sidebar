import Orders from "../components/Orders";
import Products from "../components/Products";
import { ORDERS_ROUTE, PRODUCTS_ROUTE } from "./consts";


export const publicRoutes = [
    {
        Component: Orders,
        path: ORDERS_ROUTE
    },
    {
        Component: Products,
        path: PRODUCTS_ROUTE
    },
]

export const authRoutes = [
    
]
