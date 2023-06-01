import { useState } from "react";
import classNames from "classnames";

import {
  CATEGORIES_ROUTE,
  CLIENTS_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  PROTOCOLS_ROUTE,
} from "../../../helpers/consts";

import styles from "./NoRows.module.css";

export const NoRows = ({ pathname, className }: any): JSX.Element => {
  const [route, setRoute] = useState("");

  setTimeout(() => setRoute(pathname), 77);

  return (
    <div className={classNames(styles.noRows, className)}>
      {(() => {
        switch (route) {
          case PRODUCTS_ROUTE:
            return <span>Здесь пока нет товаров</span>;
          case CLIENTS_ROUTE:
            return <span>Здесь пока нет клиентов</span>;
          case ORDERS_ROUTE:
            return <span>Здесь пока нет заказов</span>;
          case CATEGORIES_ROUTE:
            return <span>Здесь пока нет подкатегорий</span>;
          case PROTOCOLS_ROUTE:
            return <span>Здесь пока нет протоколов</span>;
          default:
            return <span>Совпадений не найдено</span>;
        }
      })()}
    </div>
  );
};
