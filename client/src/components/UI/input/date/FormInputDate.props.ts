import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface FormInputDateProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: string;
  onChange: (element: any) => void;
}
