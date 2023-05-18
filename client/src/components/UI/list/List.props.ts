import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

import { ICategory } from "../../../models/IResponse";

export interface ListProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  children?: ReactNode;
  data: any;
  category?: any;
  setCategory: any;
  updateCategory: (category: any) => void;
  deleteCategory: (id: any) => void;
  selected: any;
  setSelected: any;
  setActiveElement: any;
}
