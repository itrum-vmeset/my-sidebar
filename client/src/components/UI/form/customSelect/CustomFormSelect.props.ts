import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CustomFormSelectProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: any;
  onChange: any;
  customModalVisible: boolean;
  setCustomModalVisible: any;
  setCategoryModalVisible: any;
  setSubCategoryModalVisible: any;
  options: any;
}
