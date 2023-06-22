import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

import { ICategory, IProtocol } from "../../../../models/IResponse";

export interface ListItemProps<T>
  extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: ReactNode;
  item: ICategory | IProtocol;
  category: any;
  setCategory: (category: ICategory | IProtocol) => void;
  updateCategory: (category: ICategory | IProtocol) => void;
  deleteCategory: (category: ICategory) => void;
  selected: any;
  setSelected: any;
  setActiveElement: (element: any) => void;
  setModalVisible: (action: boolean) => void;
  setFormVisible?: (action: boolean) => void;
}
