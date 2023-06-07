import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CustomFormSelectProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: any;
  onChange: any;
  customModalVisible: any;
  setCustomModalVisible: any;
  setCategoryModalVisible: any;
  setSubCategoryModalVisible: any;
  deliveryModalVisible: boolean;
  setDeliveryModalVisible: any;
  orderModalVisible: boolean;
  setOrderModalVisible: any;
  options: any;
  name: string;
}
