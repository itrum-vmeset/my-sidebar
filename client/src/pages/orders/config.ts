import { Column } from "react-table";

import CustomFormSelect from "../../components/UI/form/customSelect/CustomFormSelect";
import Total from "../../components/UI/form/total/Total";
import { FormInputDate } from "../../components/UI/input/date/FormInputDate";
import { FormInput } from "../../components/UI/input/FormInput";
import { priceRu } from "../../helpers/priceRu";
import { translator } from "../../helpers/translator";
import { IFormData } from "../../models/IFormData";

export const columns: Column[] = [
  {
    Header: "Заказчик",
    accessor: (row: any) => {
      let user = "";
      if (row.user.name) {
        user = user.concat(row.user.name);
      }
      if (row.user.lastName) {
        user = user.concat(" ", row.user.lastName);
      }
      if (row.user.secondName) {
        user = user.concat(" ", row.user.secondName);
      }
      if (row.user.firmName) {
        user = user.concat(" ", row.user.firmName);
      }
      return user;
    },
    width: 300,
  },
  {
    Header: "Номер заказа",
    accessor: "order_number",
    width: 150,
  },
  {
    Header: "Способ получения",
    accessor: (row: any) => translator(row.delivery_type, "orders"),
    width: 150,
  },
  {
    Header: "Дата оформления",
    accessor: "date",
    width: 150,
  },
  {
    Header: "Сумма заказа",
    accessor: (row: any) => priceRu(row.total),
    width: 150,
  },
  {
    Header: "Оплачено",
    accessor: (row: any) => (row.isPayed ? "Да" : "Нет"),
    width: 100,
  },
];

export const formData: IFormData[] = [
  {
    id: 1,
    title: "Заказчик",
    Component: FormInput,
    componentProps: {
      name: "user",
    },
  },
  {
    id: 2,
    title: "Номер заказа",
    Component: FormInput,
    componentProps: {
      name: "order_number",
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
    title: "Способ оплаты",
    Component: CustomFormSelect,
    componentProps: {
      name: "order_type",
      options: "payments",
    },
  },
  {
    id: 5,
    title: "Способ получения",
    Component: CustomFormSelect,
    componentProps: {
      name: "delivery_type",
      options: "delivery",
    },
  },
  {
    id: 6,
    title: "",
    Component: Total,
    componentProps: {
      name: "total",
    },
  },
  //   {
  //     id: 5,
  //     title: "Бренд",
  //     Component: CustomFormSelect,
  //     componentProps: {
  //       name: "brand",
  //       options: "brands",
  //     },
  //   },
  //   {
  //     id: 6,
  //     title: "Товары",
  //     Component: CustomFormList,
  //     componentProps: {
  //       name: "products",
  //     },
  //   },
];
