import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface FormImagesProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: Array<string>;
  onChange: (value: any) => void;
  // data: IProductMock;
  // setData: (selectedCategory: IProductMock) => void;
}
