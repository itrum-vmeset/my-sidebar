import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DateTimeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: any;
  changeValue: any;
}
