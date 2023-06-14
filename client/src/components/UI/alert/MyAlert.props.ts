import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { Row } from "react-table";

export interface MyAlertProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  alertVisible: boolean;
  setAlertVisible: (e: boolean) => void;
  deleteItems: () => void;
  selectedItems: Row[];
}
