import { Column } from "react-table";
import * as Yup from "yup";

import CustomFormCategory from "../../components/UI/form/category/CustomFormCategory";
import Characteristics from "../../components/UI/form/characteristics/Characteristics";
import CustomFormSelect from "../../components/UI/form/customSelect/CustomFormSelect";
import FormImages from "../../components/UI/form/images/FormImages";
import { FormInput } from "../../components/UI/input/FormInput";
import TagsInput from "../../components/UI/tagsInput/TagsInput";
import { Textarea } from "../../components/UI/textarea/Textarea";
import { IFormData } from "../../models/IFormData";

export const columns: Column[] = [
  {
    Header: "Название",
    accessor: "name",
    width: 850,
  },
  {
    Header: "Артикул",
    accessor: "codeFrom1C",
    width: 150,
  },
];

export const formData: IFormData[] = [
  {
    id: 1,
    title: "Название 1C",
    Component: FormInput,
    componentProps: {
      name: "nameFrom1C",
      disabled: true,
    },
  },
  {
    id: 2,
    title: "Название*",
    Component: FormInput,
    componentProps: {
      name: "name",
    },
  },
  {
    id: 3,
    title: "Бренд*",
    Component: CustomFormSelect,
    componentProps: {
      name: "brand",
      options: "brands",
    },
  },
  {
    id: 4,
    title: "Артикул",
    Component: FormInput,
    componentProps: {
      name: "codeFrom1C",
      disabled: true,
    },
  },
  {
    id: 5,
    title: "Описание*",
    Component: Textarea,
    componentProps: {
      name: "description",
    },
  },
  {
    id: 6,
    title: "",
    Component: FormImages,
    componentProps: {
      name: "images",
    },
  },
  {
    id: 7,
    title: "Цена",
    Component: FormInput,
    componentProps: {
      name: "price",
      disabled: true,
    },
  },
  {
    id: 9,
    title: "",
    Component: CustomFormCategory,
    componentProps: {
      name: "catalog_product",
    },
  },
  {
    id: 10,
    title: "",
    Component: Characteristics,
    componentProps: {
      name: "variations",
      options: "variations",
    },
  },
  {
    id: 11,
    title: "",
    Component: Characteristics,
    componentProps: {
      name: "characteristics",
      options: "characteristics",
    },
  },
  {
    id: 12,
    title: "Тэги товаров",
    Component: TagsInput,
    componentProps: {
      name: "tags",
    },
  },
];

export const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .typeError("Введите текст")
    .min(2, "Минимум 2 буквы")
    .max(60, "Максимум 60 букв")
    .required("Обязательное поле"),
  brand: Yup.object().required("Обязательное поле"),
  description: Yup.string()
    .typeError("Введите текст")
    .min(2, "Минимум 2 буквы")
    .max(1000, "Максимум 1000 букв")
    .required("Обязательное поле"),
  variations: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().min(2).required("Обязательное поле"),
      code: Yup.string().min(2).required("Обязательное поле"),
    })
  ),
  images: Yup.array().of(Yup.string().required("Обязательное поле")),
});
