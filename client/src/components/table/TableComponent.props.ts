import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Row, TableInstance } from "react-table";

interface IRenderAction {
  component: JSX.Element;
  width: number;
  action: (item: any) => void;
}

export interface TableComponentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setModalVisible?: (event: boolean) => void;
  setAlertVisible?: (event: boolean) => void;
  selectedItems?: Row[];
  setSelectedItems?: (element: Row[]) => void;
  tableInstance: TableInstance<{}>;
  renderActions: () => IRenderAction[];
  checkBox?: boolean;
  setSelectVisible?: (event: boolean) => void;
  handleClickRow?: (row: Row) => void;
}
