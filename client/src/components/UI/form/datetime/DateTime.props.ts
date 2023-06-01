import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DateTimeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: any;
  setData: any;
}
