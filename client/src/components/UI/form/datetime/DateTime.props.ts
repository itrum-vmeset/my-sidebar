import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DateTimeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: string;
  changeValue: (item: string) => void;
}
