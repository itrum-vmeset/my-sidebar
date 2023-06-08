import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CustomFormSelectProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: any;
  onChange: any;
  customModalVisible: Record<string, boolean>;
  setCustomModalVisible: (action: Record<string, boolean>) => void;
  setCategoryModalVisible: (action: boolean) => void;
  setSubCategoryModalVisible: (action: boolean) => void;
  options: any;
  name: string;
}
