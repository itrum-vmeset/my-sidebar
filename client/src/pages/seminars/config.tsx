import { Column } from "react-table";

import { Typography } from "../../components/UI/typography/Typography";

export const future: Column[] = [
  {
    Header: "Название",
    accessor: "name",
    width: 510,
  },
  {
    Header: "Спикер",
    accessor: "speaker",
    width: 330,
  },
  {
    Header: "Дата",
    accessor: "datetime",
    width: 150,
    Cell: ({ value }: any) => {
      return <span>{value?.split(" ")[0]}</span>;
    },
  },
];

export const history: Column[] = [
  {
    Header: "Название",
    accessor: "name",
    width: 850,
  },
  {
    Header: "Дата",
    accessor: "date",
    width: 150,
  },
];

export const request: Column[] = [
  {
    Header: "Название семнара",
    accessor: "seminar",
    width: 500,
    Cell: ({ value }: any) => {
      return <span>{value?.name}</span>;
    },
  },
  {
    Header: "Пользователь",
    accessor: "user",
    Cell: (row: any) => (
      <Typography>
        {row.cell.value?.lastName} {row.cell.value?.name}{" "}
        {row.cell.value?.secondName}
      </Typography>
    ),
    width: 250,
    id: "user",
  },
  {
    Header: "Номер телефона",
    accessor: "user",
    Cell: ({ value }: any) => {
      return <span>{value?.phone}</span>;
    },
    width: 150,
    id: "phone",
  },
  {
    Header: "Дата",
    accessor: "date",
    width: 100,
  },
];

export const navItems = [
  { id: 1, title: "Будущие", value: "future" },
  { id: 2, title: "История", value: "history" },
  { id: 3, title: "Заявки на семинары", value: "request" },
];

export const futureItem = {
  id: Date.now().toString(),
  name: "",
  description: "",
  speaker: "",
  speaker_speciality: "",
  city: {
    id: "",
    name: "",
    address: "",
  },
  datetime: "",
  image: "",
  mobileImage: "",
};

export const historyItem = {
  id: Date.now().toString(),
  name: "",
  description: "",
  date: "",
  image: "",
  mobileImage: "",
};
