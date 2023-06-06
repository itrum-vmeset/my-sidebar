import { Column } from "react-table";

export const columns: Column[] = [
  {
    Header: "Город",
    accessor: "name",
    width: 500,
  },
  {
    Header: "Адрес",
    accessor: "address",
    width: 500,
  },
];
