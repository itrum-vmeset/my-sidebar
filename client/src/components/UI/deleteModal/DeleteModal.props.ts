import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface DeleteModalProps<T>
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  modalVisible: boolean;
  setModalVisible: (action: boolean) => void;
  deleteItem: (item: T) => void;
  activeElement: T;
  text: string;
}
