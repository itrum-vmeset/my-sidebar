import { priceRu } from "../../helpers/priceRu";
import { translator } from "../../helpers/translator";

export const columns = [
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
