export const translator = (key: string) => {
  switch (key) {
    case "name":
      return "Название*";
    case "value2":
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
    default:
      return null;
  }
};

export const headTranslator = (key: string) => {
  switch (key) {
    case "fullName":
      return "ФИ";
    case "email":
      return "Почта";
    case "phone":
      return "Телефон";
    default:
      return null;
  }
};
