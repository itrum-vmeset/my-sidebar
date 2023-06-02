import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface FormInputPercentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  name: string;
  value: number;
  onChange: () => void;
}
