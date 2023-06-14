import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface MyModalMProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  modalVisible: boolean;
  setModalVisible: (e: boolean) => void;
  children: ReactNode;
  setActiveElement: (element: null) => void;
}
