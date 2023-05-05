import { useMemo } from "react";

import { headTranslator } from "../helpers/translator";

const filterByPath = (keys: any, pathname: any) => {
  return keys.filter((key: any) => {
    switch (pathname) {
      case "/products":
        return key !== "is";
      case "/brands":
        return !(key === "margin" || key === "__v" || key === "id");
      case "/clients":
        return !(key === "firmName" || key === "role");
      case "/categories":
        return !(key === "position" || key === "__v");
      default:
    }
    return !key.includes("is");
  });
};

const mapData = (keys: any, pathname: any) => {
  return keys.map((key: any) => {
    switch (pathname) {
      case "/products":
        if (key === "brand")
          return {
            Header: key,
            accessor: key,
            Cell: ({ value }: any) => {
              return <span>{value?.name || ""}</span>;
            },
            width: 60,
          };
        return { Header: key, accessor: key };

      case "/brands":
        return { Header: key, accessor: key };
      case "/clients":
        return { Header: headTranslator(key), accessor: key, width: 330 };
      case "/categories":
        return { Header: key, accessor: key };
      default:
        return { Header: key, accessor: key };
    }
    return { Header: headTranslator(key), accessor: key };
  });
};

export const useColumns = (data: any, pathname: any) => {
  const productsColumns = useMemo(() => {
    if (data[0]) {
      const keys = Object.keys(data[0]);
      const filteredKeys = filterByPath(keys, pathname);
      return mapData(filteredKeys, pathname) || [];
    }
    return [];
  }, [data]);
  return productsColumns;
};
