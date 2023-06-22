import { Column } from "react-table";

import { IClient } from "../../models/IResponse";

function formatPhoneNumber(phoneNumberString: string): string | null {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(7|)?(\d{3})(\d{3})(\d{4})$/);
  let intlCode;
  if (match) {
    intlCode = match![1] ? "+7 " : "";
  }
  return (
    match && [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("")
  );
}

export const columns: Column[] = [
  {
    Header: "ФИ",
    accessor: (row) => `${(row as IClient).name} ${(row as IClient).lastName}`,
    width: 350,
  },
  {
    Header: "Почта",
    accessor: "email",
    width: 350,
  },
  {
    Header: "Телефон",
    accessor: (row) => formatPhoneNumber((row as IClient).phone),
    width: 300,
  },
];
