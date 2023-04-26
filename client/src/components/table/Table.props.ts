import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Row } from "react-table";

export interface TableProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: any;
  setModalVisible: (event: boolean) => void;
  setActiveElement: (element: any) => void;
  setAlertVisible: (event: boolean) => void;
  selectedItems: Row[];
  setSelectedItems: (element: any) => void;
}
