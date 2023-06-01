import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface FormCategoryProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: any;
  setData: (selectedCategory: any) => void;
  categoryModalVisible: boolean;
  setCategoryModalVisible: any;
  subCategoryModalVisible: boolean;
  setSubCategoryModalVisible: any;
}
