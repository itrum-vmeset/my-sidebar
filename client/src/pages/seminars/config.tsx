import { Column } from "react-table";

import CustomFormSelect from "../../components/UI/form/customSelect/CustomFormSelect";
import DateTime from "../../components/UI/form/datetime/DateTime";
import FormImage from "../../components/UI/form/formImage/FormImage";
import { FormInputDate } from "../../components/UI/input/date/FormInputDate";
import { FormInput } from "../../components/UI/input/FormInput";
import { Textarea } from "../../components/UI/textarea/Textarea";
import { Typography } from "../../components/UI/typography/Typography";
import { IFormData } from "../../models/IFormData";

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

export const futureFormData: IFormData[] = [
  {
    id: 1,
    title: "Название*",
    Component: FormInput,
    componentProps: {
      name: "name",
    },
  },
  {
    id: 2,
    title: "Описание*",
    Component: Textarea,
    componentProps: {
      name: "description",
    },
  },
  {
    id: 3,
    title: "Спикер*",
    Component: FormInput,
    componentProps: {
      name: "speaker",
    },
  },
  {
    id: 4,
    title: "Специальность спикера*",
    Component: FormInput,
    componentProps: {
      name: "speaker_speciality",
    },
  },

  {
    id: 5,
    title: "Город*",
    Component: CustomFormSelect,
    componentProps: {
      name: "city",
      options: "cities",
    },
  },
  {
    id: 6,
    title: "",
    Component: DateTime,
    componentProps: {
      name: "datetime",
    },
  },
  {
    id: 7,
    title: "Фото",
    Component: FormImage,
    componentProps: {
      name: "image",
    },
  },
];

export const historyFormData: IFormData[] = [
  {
    id: 1,
    title: "Название*",
    Component: FormInput,
    componentProps: {
      name: "name",
    },
  },
  {
    id: 2,
    title: "Описание*",
    Component: Textarea,
    componentProps: {
      name: "description",
    },
  },
  {
    id: 3,
    title: "Дата оформления",
    Component: FormInputDate,
    componentProps: {
      name: "date",
    },
  },
  {
    id: 4,
    title: "Фото",
    Component: FormImage,
    componentProps: {
      name: "image",
    },
  },
];
