import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface FormRowProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  changeRow: (item: Record<string, string>) => void;
  removeRow: (id: string) => void;
  item: Record<string, string>;
}
