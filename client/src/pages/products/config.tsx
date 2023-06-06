import { Column } from "react-table";

export const columns: Column[] = [
  {
    Header: "Название",
    accessor: "name",
    width: 850,
  },
  {
    Header: "Артикул",
    accessor: "codeFrom1C",
    width: 150,
  },
];
