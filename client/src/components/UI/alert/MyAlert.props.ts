import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface MyAlertProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  alertVisible: boolean;
  setAlertVisible: (e: boolean) => void;
  deleteItems: () => any;
  selectedItems: any;
  setSelectedItems: any;
  refetch: any;
}
