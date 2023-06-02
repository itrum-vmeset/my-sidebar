import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface FormInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  // name: string;
  value: string;
  onChange: any;
}
