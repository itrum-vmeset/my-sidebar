import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface FormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activeElement: any;
  modalVisible: any;
  setModalVisible: any;
  updateItem: any;
  removeItem: any;
  brands?: any;
  cities?: any;
}
