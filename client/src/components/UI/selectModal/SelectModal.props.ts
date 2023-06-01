import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface SelectModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  selectModalVisible: boolean;
  setSelectModalVisible: (e: boolean) => void;
  options: any;
  active: any;
  setData: (val: any) => void;
}
