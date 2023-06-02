import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CustomFormListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: any;
  onChange: any;
}
