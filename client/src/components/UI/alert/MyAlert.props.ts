import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface MyAlertProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  alertVisible: boolean;
  setAlertVisible: (e: boolean) => void;
  removeProduct: (items: any) => void;
  selectedItems: any;
  setSelectedItems: any;
}
