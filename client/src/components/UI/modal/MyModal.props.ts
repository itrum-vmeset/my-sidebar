import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface MyModalProps<T>
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  modalVisible: boolean;
  setModalVisible: (e: boolean) => void;
  children: ReactNode;
  // setActiveElement: (e: any) => void;
  setActiveElement: (element: T | undefined) => void;
  // setActiveElement: (element: T | object) => void;
}
