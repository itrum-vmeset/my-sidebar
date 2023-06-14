import { DetailedHTMLProps, HTMLAttributes } from "react";
import {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

import { IProductMock } from "../../../../models/IProductMockData";
import { ICategory, IPromocode } from "../../../../models/IResponse";

export interface FormCategoriesProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: ICategory;
  changeValue: (selectedCategory: ICategory) => void;
  categoryModalVisible: boolean;
  setCategoryModalVisible: (action: boolean) => void;
  subCategoryModalVisible: boolean;
  setSubCategoryModalVisible: (action: boolean) => void;
  getall: IPromocode | IProductMock;
  setValue: UseFormSetValue<FieldValues>;
  customModalVisible: Record<string, boolean>;
  setCustomModalVisible: (el: Record<string, boolean>) => void;
  name: string;
}
