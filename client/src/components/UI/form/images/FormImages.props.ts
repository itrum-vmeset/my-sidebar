import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IProductMock } from "../../../../models/IProductMockData";

export interface FormImagesProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: IProductMock;
  setData: (selectedCategory: IProductMock) => void;
}
