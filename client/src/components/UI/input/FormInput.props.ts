import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface FormInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  value: any;
  onChange: () => void;
}
