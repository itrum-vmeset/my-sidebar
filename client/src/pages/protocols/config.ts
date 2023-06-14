import * as Yup from "yup";

import CustomFormSelect from "../../components/UI/form/customSelect/CustomFormSelect";
import CustomFormList from "../../components/UI/form/formList/FormList";
import { FormInput } from "../../components/UI/input/FormInput";
import { Textarea } from "../../components/UI/textarea/Textarea";
import { IFormData } from "../../models/IFormData";

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
    title: "Бренд",
    Component: CustomFormSelect,
    componentProps: {
      name: "brand",
      options: "brands",
    },
  },
  {
    id: 3,
    title: "Описание",
    Component: Textarea,
    componentProps: {
      name: "description",
    },
  },
  {
    id: 4,
    title: "Категория",
    Component: FormInput,
    componentProps: {
      name: "protocol_category",
      disabled: true,
    },
  },
  {
    id: 5,
    title: "Товары",
    Component: CustomFormList,
    componentProps: {
      name: "products",
    },
  },
];

export const ProtocolSchema = Yup.object().shape({
  name: Yup.string()
    .typeError("Введите текст")
    .min(2, "Минимум 2 буквы")
    .max(30, "Максимум 30 букв")
    .required("Обязательное поле"),
  brand: Yup.object().required("Обязательное поле"),
  description: Yup.string()
    .typeError("Введите текст")
    .min(2, "Минимум 2 буквы")
    .max(500, "Максимум 500 букв")
    .required("Обязательное поле"),
});
