import { BANNERS_ROUTE, PROMOCODE_ROUTE } from "./consts";

export const translator = (key: string, pathname: string) => {
  switch (key) {
    case "name":
      return pathname === PROMOCODE_ROUTE ? "Заголовок" : "Название*";
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
      return pathname === BANNERS_ROUTE ? "Товары" : "Товары протокола";
    case "speaker":
      return "Спикер*";
    case "speaker_speciality":
      return "Специальность спикера*";
    case "city":
      return "Город*";
    case "image":
      return pathname === BANNERS_ROUTE ? "Баннер" : "Фото";
    case "percent":
      return "Процент скидки";
    case "user":
      return "Заказчик";
    default:
      return null;
  }
};

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
