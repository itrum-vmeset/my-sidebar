import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

import { ICategory, IProtocol } from "../../../models/IResponse";

export interface ListProps<T>
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  children?: ReactNode;
  data: {
    data: T[];
    count: number;
  } | null;
  category?: ICategory | IProtocol;
  setCategory?: any;
  updateCategory: (category: any) => void;
  deleteCategory: (id: any) => void;
  selected: T[] | null;
  setSelected: any;
  setActiveElement: (action: any) => void;
  setModalVisible: (action: boolean) => void;
  setFormVisible?: (action: boolean) => void;
}
