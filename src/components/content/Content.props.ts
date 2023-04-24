import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ContentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  // service: {
  //   getAll: (params: IParam) => Promise<any>;
  // };
  service: any;
  updateProduct: (product: any) => void;
  deleteProduct: (product: any) => void;
}
