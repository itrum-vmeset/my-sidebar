import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface MyModalProps<T>
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  modalVisible: boolean;
  setModalVisible: (e: boolean) => void;
  children: ReactNode;
  setActiveElement: (element: T) => void;
}
