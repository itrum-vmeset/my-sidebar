function formatPhoneNumber(phoneNumberString: string) {
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

export const columns = [
  {
    Header: "ФИ",
    accessor: (row: any) => `${row.name} ${row.lastName}`,
    width: 350,
  },
  {
    Header: "Почта",
    accessor: "email",
    width: 350,
  },
  {
    Header: "Телефон",
    accessor: (row: any) => formatPhoneNumber(row.phone),
    width: 300,
  },
];
