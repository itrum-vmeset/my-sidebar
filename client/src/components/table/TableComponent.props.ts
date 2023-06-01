import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Row } from "react-table";

export interface TableComponentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: any;
  setModalVisible?: (event: boolean) => void;
  setActiveElement?: (element: any) => void;
  setAlertVisible?: (event: boolean) => void;
  selectedItems?: Row[];
  setSelectedItems?: (element: any) => void;
  columns: any;
  action?: any;
  tableInstance: any;
  renderActions: any;
  checkBox?: boolean;
  setSelectVisible?: (event: boolean) => void;
  handleClickRow?: (row: any) => void;
}
