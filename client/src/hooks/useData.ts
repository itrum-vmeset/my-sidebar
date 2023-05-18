import { useEffect } from "react";

import {
  CLIENTS_ROUTE,
  ORDERS_ROUTE,
} from "../helpers/consts";

export const useData = (
  data: any,
  setItems: (arg0: any) => any,
  isGoodsLoading: any
) => {
  useEffect(() => {
    if (location.pathname === CLIENTS_ROUTE) {
      const newData =
        data?.data?.map((item: any) => {
          const { lastName, name, ...dataItem } = item;
          return {
            ...dataItem,
            fullName: name + " " + lastName,
          };
        }) || [];
      !isGoodsLoading && setItems(newData);
    } else if (location.pathname === ORDERS_ROUTE) {
      const newData =
        data?.data?.map((item: any) => {
          const {
            user,
            order_number,
            date,
            order_type,
            delivery_type,
            ...dataItem
          } = item;
          const fullName = "".concat(
            user.lastName ? user.lastName : "",
            user.name ? ` ${user.name}` : "",
            user.firmName ? ` ${user.firmName}` : ""
          );
          return {
            customer: fullName,
            order_number,
            date,
            order_type,
            delivery_type,
            ...dataItem,
          };
        }) || [];
      !isGoodsLoading && setItems(newData);
    }
    // else if (location.pathname === PROTOCOLS_ROUTE) {
    //   const newData =
    //     data?.data?.map((item: any) => {
    //       const {
    //         name,
    //         brand,
    //         description,
    //         protocol_category,
    //         products,
    //         ...dataItem
    //       } = item;
    //       return {
    //         description,
    //         name,
    //         brand,
    //         protocol_category,
    //         products,
    //         ...dataItem,
    //       };
    //     }) || [];
    //   !isGoodsLoading && setItems(newData);
    // }
    else {
      !isGoodsLoading && setItems(data?.data);
    }
  }, [isGoodsLoading, data]);
};
