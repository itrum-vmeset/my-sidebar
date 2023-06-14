import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface FormRowProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  changeRow: (item: Record<string, string | number>) => void;
  removeRow: (id: number | string) => void;
  item: Record<string, string | number>;
}
