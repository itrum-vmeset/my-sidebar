import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface MyAlertProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  alertVisible: boolean;
  setAlertVisible: (e: boolean) => void;
  children: ReactNode;
  removeProduct: (items: any) => void;
}
