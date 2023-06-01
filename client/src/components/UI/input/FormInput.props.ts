import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface FormInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  name: string;
  // value: any;
  // onChange: any;
  // label: string;
  // register: any;
  // required: boolean;
  // getValues: any;
}
