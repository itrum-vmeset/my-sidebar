import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TableProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: any;
  removeProduct: (items: any) => void;
  modalVisible: boolean;
  setModalVisible: (item: any) => void;
  addProduct: (items: any) => void;
}
