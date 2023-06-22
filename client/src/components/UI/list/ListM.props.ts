import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ListMProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  children?: ReactNode;
  data: any;
  category?: any;
  setCategory?: any;
  updateCategory: (category: any) => void;
  deleteCategory: (id: any) => void;
  selected: any;
  setSelected: any;
  setActiveElement: (action: any) => void;
  setModalVisible: (action: boolean) => void;
  setFormVisible?: (action: boolean) => void;
}
