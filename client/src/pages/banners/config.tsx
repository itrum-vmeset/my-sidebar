import * as Yup from "yup";

import FormImage from "../../components/UI/form/formImage/FormImage";
import FormItemList from "../../components/UI/form/formList/FormItemList";
import FormList from "../../components/UI/form/formList/FormList";
import { FormInput } from "../../components/UI/input/FormInput";
import { FormInputPercent } from "../../components/UI/input/FormInputPercent";

export interface IFormData {
  id: number;
  title: string;
  // Component: JSX.Element;
  Component: any;
  componentProps: any;
}

export const BannerSchema = Yup.object().shape({
  name: Yup.string()
    .typeError("Введите текст")
    .min(2, "Минимум 2 буквы")
    .max(20, "Максимум 20 букв")
    .required("Обязательное поле"),
  description: Yup.string()
    .typeError("Введите текст")
    .min(2, "Минимум 2 буквы")
    .max(50, "Максимум 50 букв")
    .required("Обязательное поле"),
  percent: Yup.number()
    .typeError("Введите число")
    .positive("Не может быть отрицательной")
    .required("Обязательное поле"),
  image: Yup.string()
    .typeError("Введите текст")
    .url("Здесь нужно добавить ссылку")
    // .matches(
    //   /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    //   "Здесь нужно добавить ссылку"
    // )
    .required("Обязательное поле"),
});

export const columns = [
  {
    Header: "Заголовок",
    accessor: "name",
    width: 1000,
  },
];

export const formData: IFormData[] = [
  {
    id: 1,
    title: "Заголовок",
    Component: FormInput,
    componentProps: {
      name: "name",
    },
  },
  {
    id: 2,
    title: "Краткое описание",
    Component: FormInput,
    componentProps: {
      name: "description",
    },
  },
  {
    id: 3,
    title: "Процент скидки",
    Component: FormInputPercent,
    componentProps: {
      name: "percent",
    },
  },
  {
    id: 4,
    title: "Баннер",
    Component: FormImage,
    componentProps: {
      name: "image",
    },
  },
  {
    id: 5,
    title: "Товары",
    Component: FormItemList,
    componentProps: {
      name: "products",
    },
  },
];
