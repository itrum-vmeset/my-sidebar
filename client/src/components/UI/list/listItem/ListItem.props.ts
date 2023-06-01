import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ListItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: ReactNode;
  item: any;
  category: any;
  setCategory: any;
  updateCategory: (category: any) => void;
  deleteCategory: (id: any) => void;
  selected: any;
  setSelected: any;
  setActiveElement: any;
  setModalVisible: any;
  setFormVisible?: any;
}
