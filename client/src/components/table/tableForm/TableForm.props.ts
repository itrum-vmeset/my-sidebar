import { DetailedHTMLProps, FormHTMLAttributes } from "react";

export interface TableFormProps
  extends DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  addItem: () => void;
  item: Record<string, string>;
  setItem: (item: any) => void;
}
