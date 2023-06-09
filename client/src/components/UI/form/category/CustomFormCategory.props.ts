import { DetailedHTMLProps, HTMLAttributes } from "react";

import { ICategory } from "../../../../models/IResponse";

export interface CustomFormCategoryProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: any;
  onChange: (selectedCategory: any) => void;
  categoryModalVisible: boolean;
  setCategoryModalVisible: any;
  subCategoryModalVisible: boolean;
  setSubCategoryModalVisible: any;
  getall: any;
  setValue: any;
  customModalVisible: any;
  setCustomModalVisible: any;
  name: string;
}
