import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TableProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: any;
  removeProduct: (products: any) => void;
  modalVisible: boolean;
  setModalVisible: (boolean: boolean) => void;
  editProduct: (product: any) => void;
}
