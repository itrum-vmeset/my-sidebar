import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from "react";

import { NewBrand } from "../../../pages/brands/Brands";
import { NewCity } from "../../../pages/cities/Cities";

type CityInput = {
  value: string;
  placeholder: string;
  attach?: ReactNode;
};

export interface TableFormProps
  extends DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  addItem: () => void;
  // item: {
  //   [key: string]: CityInput;
  // };
  item: NewCity | NewBrand;
  // setItem: (item: {
  //   name: { value: string; placeholder: string };
  //   address?: { value: string; placeholder: string };
  //   icon?: {
  //     value: string;
  //     placeholder: string;
  //     attach: JSX.Element;
  //   };
  // }) => void;
  setItem: (item: NewCity | NewBrand) => void;
  buttonText: string;
}
