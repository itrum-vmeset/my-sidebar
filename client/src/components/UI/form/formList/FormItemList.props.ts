import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface FormItemListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: any;
  onChange: any;
}
