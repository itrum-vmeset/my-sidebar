import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  name: string;
}

export interface SelectProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: any;
  value: string;
  defaultValue?: string;
}
