import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CharacteristicsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  // data: IProductMock;
  // setData: (selectedCategory: IProductMock) => void;
  // characteristics?: any;
  // variations?: any;

  value: any;
  onChange: any;
  name: string;
}
