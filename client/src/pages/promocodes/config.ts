import { Column } from "react-table";
import * as Yup from "yup";

import CustomFormCategory from "../../components/UI/form/category/CustomFormCategory";
import CustomFormSelect from "../../components/UI/form/customSelect/CustomFormSelect";
import CustomFormList from "../../components/UI/form/formList/CustomFormList";
import { FormInput } from "../../components/UI/input/FormInput";
import { FormInputPercent } from "../../components/UI/input/percent/FormInputPercent";
import { IFormData } from "../../models/IFormData";

export const columns: Column[] = [
  {
    Header: "Заголовок",
    accessor: "name",
    width: 1000,
  },
];

export const formData: IFormData[] = [
  {
    id: 1,
    title: "Заголовок*",
    Component: FormInput,
    componentProps: {
      name: "name",
    },
  },
  {
    id: 2,
    title: "Промокод*",
    Component: FormInput,
    componentProps: {
      name: "promocode",
    },
  },
  {
    id: 3,
    title: "Процент скидки*",
    Component: FormInputPercent,
    componentProps: {
      name: "percent",
    },
  },
  {
    id: 4,
    title: "",
    Component: CustomFormCategory,
    componentProps: {
      name: "catalog_product",
    },
  },
  {
    id: 5,
    title: "Бренд",
    Component: CustomFormSelect,
    componentProps: {
      name: "brand",
      options: "brands",
    },
  },
  {
    id: 6,
    title: "Товары",
    Component: CustomFormList,
    componentProps: {
      name: "products",
    },
  },
];

export const PromocodeSchema = Yup.object().shape({
  name: Yup.string()
    .typeError("Введите текст")
    .min(2, "Минимум 2 буквы")
    .max(30, "Максимум 30 букв")
    .required("Обязательное поле"),
  promocode: Yup.string()
    .typeError("Введите текст")
    .min(2, "Минимум 2 буквы")
    .max(30, "Максимум 30 букв")
    .required("Обязательное поле"),
  percent: Yup.number()
    .typeError("Введите число")
    .positive("Не может быть отрицательной")
    .required("Обязательное поле"),
});
