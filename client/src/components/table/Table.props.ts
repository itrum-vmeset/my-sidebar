import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Row, TableInstance } from "react-table";

export interface IRenderAction<T> {
  component: JSX.Element;
  width: number;
  action: (item: T) => void;
}

export interface TableProps<T>
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setModalVisible?: (event: boolean) => void;
  setAlertVisible?: (event: boolean) => void;
  selectedItems?: Row[];
  setSelectedItems?: (element: Row[]) => void;
  tableInstance: TableInstance<{}>;
  renderActions: () => T[];
  checkBox?: boolean;
  setSelectVisible?: (event: boolean) => void;
  handleClickRow?: (row: Row) => void;
}
