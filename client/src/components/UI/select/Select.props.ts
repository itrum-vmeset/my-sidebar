import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export interface SelectProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: Record<string, string>[];
  value: string;
  defaultValue?: string;
}
