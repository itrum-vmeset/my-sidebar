import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ProductModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  productModalVisible: boolean;
  setProductModalVisible: (e: boolean) => void;
  children: ReactNode;
}
