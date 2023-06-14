import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CustomFormSelectProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: string | Record<string, string>;
  changeValue: () => void;
  customModalVisible: Record<string, boolean>;
  setCustomModalVisible: (action: Record<string, boolean>) => void;
  setCategoryModalVisible: (action: boolean) => void;
  setSubCategoryModalVisible: (action: boolean) => void;
  options: Record<string, string | number>[];
  name: string;
}
