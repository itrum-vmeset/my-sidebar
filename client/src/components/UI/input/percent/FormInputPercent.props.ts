import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface FormInputPercentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  value: number;
  onChange: () => void;
}
