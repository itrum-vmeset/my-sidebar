import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface BrandModalProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  modalVisible: boolean;
  setModalVisible: (action: boolean) => void;
  deleteItem: (item: any) => void;
  activeElement: any;
  text: string;
}
