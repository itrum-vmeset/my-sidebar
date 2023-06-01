import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from "react";

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
  item: {
    [key: string]: CityInput;
  };
  setItem: (item: any) => void;
  buttonText: string;
}
