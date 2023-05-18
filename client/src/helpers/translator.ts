export const translator = (key: string) => {
  switch (key) {
    case "name":
      return "Название*";
    case "nameFrom1C":
      return "Название 1C";
    case "brand":
      return "Бренд*";
    case "codeFrom1C":
      return "Артикул";
    case "description":
      return "Описание*";
    case "images":
      return null;
    case "price":
      return "Цена";
    case "catalog_product":
      return null;
    case "sub_catalog_product":
      return null;
    case "variations":
      return null;
    case "tags":
      return "Тэги товаров";
    case "characteristics":
      return null;
    case "order_number":
      return "Номер заказа";
    case "date":
      return "Дата оформления";
    case "order_type":
      return "Способ оплаты";
    case "delivery_type":
      return "Способ получения";
    case "customer":
      return "Заказчик";
    case "COURIER_CASH":
      return "Наличными курьеру";
    case "OFFICE_TERMINAL":
      return "Переводом в офисе";
    case "OFFICE_CASH":
      return "Наличными в офисе";
    case "ONLINE":
      return "Онлайн";
    case "PICKUP":
      return "Самовывоз";
    case "DELIVERY":
      return "Доставка";
    case "protocol_category":
      return "Категория";
    case "products":
      return "Товары протокола";

    default:
      return null;
  }
};

// "id": "5102fc00-66f0-4183-a1d1-e210245e838d",
// "order_type": "OFFICE_CASH",
// "total": 3797,
// "isViewedByAdmin": false,
// "order_number": "6787156649-0",
// "delivery_type": "PICKUP",
// "isPayed": false,
// "user": {
//   "id": "8969dc27-9208-4e31-aedc-1aaf43027f24",
//   "name": "Овчарова",
//   "lastName": "Наталья",
//   "secondName": "",
//   "firmName": "",
//   "role": "SPECIALIST"
// },
// "warehouse": {
//   "city": "Ростов-на-Дону"
// },
// "date": "16.03.23"

export const headTranslator = (key: string) => {
  switch (key) {
    case "fullName":
      return "ФИ";
    case "name":
      return "Название";
    case "codeFrom1C":
      return "Артикул";
    case "email":
      return "Почта";
    case "phone":
      return "Телефон";
    case "date":
      return "Дата оформления";
    case "isPayed":
      return "Оплачено";
    case "total":
      return "Сумма заказа";
    case "delivery_type":
      return "Способ получения";
    case "user":
      return "Покупатель";
    case "order_number":
      return "Номер заказа";
    case "DELIVERY":
      return "Доставка";
    case "PICKUP":
      return "Самовывоз";
    case "customer":
      return "Заказчик";
    default:
      return "";
  }
};
