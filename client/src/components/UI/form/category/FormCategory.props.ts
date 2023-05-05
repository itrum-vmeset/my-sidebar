import { DetailedHTMLProps, HTMLAttributes } from "react";

import {
  CatalogProduct,
  IProductMock,
} from "../../../../models/IProductMockData";

export interface FormCategoryProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: IProductMock;
  setData: (selectedCategory: IProductMock) => void;
}
