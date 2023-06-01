import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface FormImageProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  value: any;
  onChange: any;
}
