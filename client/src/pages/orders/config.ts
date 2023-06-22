import { Column } from "react-table";

import CustomFormSelect from "../../components/UI/form/customSelect/CustomFormSelect";
import Total from "../../components/UI/form/total/Total";
import { FormInputDate } from "../../components/UI/input/date/FormInputDate";
import { FormInput } from "../../components/UI/input/FormInput";
import { priceRu } from "../../helpers/priceRu";
import { translator } from "../../helpers/translator";
import { IFormData } from "../../models/IFormData";
import { IOrder } from "../../models/IOrder";

export const columns: Column[] = [
  {
    Header: "Заказчик",
    accessor: (row) => {
      let user = "";
      if ((row as IOrder).user.name) {
        user = user.concat((row as IOrder).user.name);
      }
      if ((row as IOrder).user.lastName) {
        user = user.concat(" ", (row as IOrder).user.lastName);
      }
      if ((row as IOrder).user.secondName) {
        user = user.concat(" ", (row as IOrder).user.secondName);
      }
      if ((row as IOrder).user.firmName) {
        user = user.concat(" ", (row as IOrder).user.firmName);
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
    accessor: (row) =>
      translator((row as IOrder).delivery_type as string, "orders"),
    width: 150,
  },
  {
    Header: "Дата оформления",
    accessor: "date",
    width: 150,
  },
  {
    Header: "Сумма заказа",
    accessor: (row) => priceRu((row as IOrder).total),
    width: 150,
  },
  {
    Header: "Оплачено",
    accessor: (row) => ((row as IOrder).isPayed ? "Да" : "Нет"),
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
