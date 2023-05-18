import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface FormListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: any;
  setData: any;
}
