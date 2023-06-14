import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface FormImagesProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: Array<string>;
  changeValue: (value: Array<string>) => void;
}
