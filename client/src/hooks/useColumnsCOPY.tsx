import { useMemo } from "react";

import { priceRu } from "../helpers/priceRu";
import { headTranslator } from "../helpers/translator";

// const convertBrands = (data: any) => {
// console.log(data);
// }
// const convertProducts = (data: any) => {
//   console.log(data);
// }

// const convertersDict: any = {
//     '/products': convertProducts,
//     '/brands': convertBrands
// }

const filterByPath = (keys: any, pathname: any) => {
  return keys.filter((key: any) => {
    switch (pathname) {
      case "/brands":
        return !(key === "margin" || key === "__v" || key === "id");
      case "/clients":
        return !(key === "firmName" || key === "role");
      case "/categories":
        return !(key === "position" || key === "__v");
      case "/orders":
        return !(key === "warehouse" || key === "__v");
      default:
    }
    return !key.includes("yo");
  });
};

const mapData = (keys: any, pathname: string) => {
  // const convertFn: any = convertersDict[pathname];

  // if (!convertFn) {
  //   return "default";
  // }

  // return convertFn(keys);

  return keys.map((key: any) => {
    switch (pathname) {
      case "/products":
        // if (key === "brand")
        //   return {
        //     Header: key,
        //     accessor: key,
        //     Cell: ({ value }: any) => {
        //       return <span>{value?.name || ""}</span>;
        //     },
        //     width: 60,
        //   };
        // return { Header: key, accessor: key };
        if (key === "name")
          return {
            Header: headTranslator(key),
            accessor: key,
            Cell: ({ value }: any) => {
              return <span>{value}</span>;
            },
            width: 850,
          };
        if (key === "codeFrom1C")
          return {
            Header: headTranslator(key),
            accessor: key,
            Cell: ({ value }: any) => {
              return <span>{value}</span>;
            },
            width: 150,
          };
        return {
          Header: key,
          accessor: key,
          Cell: ({ value }: any) => {
            return <></>;
          },
          width: 0,
        };
      case "/brands":
        return { Header: key, accessor: key };
      case "/clients":
        return { Header: headTranslator(key), accessor: key, width: 333 };
      case "/orders":
        if (key === "customer")
          return {
            Header: headTranslator(key),
            accessor: key,
            Cell: ({ value }: any) => {
              return <span>{value}</span>;
            },
            width: 280,
          };
        // if (key === "warehouse")
        //   return {
        //     Header: key,
        //     accessor: key,
        //     Cell: ({ value }: any) => {
        //       return <></>;
        //     },
        //     width: 180,
        //   };
        if (key === "isPayed")
          return {
            Header: headTranslator(key),
            accessor: key,
            Cell: ({ value }: any) => {
              return <span>{value ? "Да" : "Нет"}</span>;
            },
            width: 100,
          };
        if (key === "delivery_type")
          return {
            Header: headTranslator(key),
            accessor: key,
            Cell: ({ value }: any) => {
              return <span>{headTranslator(value)}</span>;
            },
            width: 160,
          };
        if (key === "total")
          return {
            Header: headTranslator(key),
            accessor: key,
            Cell: ({ value }: any) => {
              return <span>{priceRu(value)}</span>;
            },
            width: 160,
          };
        return { Header: headTranslator(key), accessor: key, width: 160 };
      case "/categories":
        return { Header: key, accessor: key };
      case "/cities":
        return { Header: key, accessor: key };
      default:
        return { Header: key, accessor: key };
    }
    return { Header: headTranslator(key), accessor: key };
  });
};

export const useColumns = (data: any, pathname: any) => {
  const productsColumns = useMemo(() => {
    if (data?.length && data[0]) {
      const keys = Object.keys(data[0]);
      const filteredKeys = filterByPath(keys, pathname);
      return mapData(filteredKeys, pathname) || [];
    }
    return [];
  }, [data]);
  return productsColumns;
};
